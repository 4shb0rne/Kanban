import { useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from "../../util/firebase-config";
import { Link } from "react-router-dom";
import List from "../components/List";
import Modal from "../components/Modal";
import AddTask from "./AddTask";
import { Add } from "../components/Icons";

import { useKanban } from "../../controller/KanbanController";
import { debounce } from "../../util/utils";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const Kanban = ({ userId }) => {
    const { boardId } = useParams();
    const [modal, setModal] = useState(false);
    const { initialData, setInitialData, boardName } = useKanban(
        boardId
    );
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (result.type === "task") {
            const startColumn = initialData.columns[source.droppableId];
            const endColumn = initialData.columns[destination.droppableId];

            if (startColumn === endColumn) {
                const newTaskIds = Array.from(endColumn.taskIds);

                newTaskIds.splice(source.index, 1);
                newTaskIds.splice(destination.index, 0, draggableId);

                const newColumn = {
                    ...endColumn,
                    taskIds: newTaskIds,
                };

                const newState = {
                    ...initialData,
                    columns: {
                        ...initialData.columns,
                        [endColumn.id]: newColumn,
                    },
                };

                setInitialData(newState);

                const docRef = doc(db, `boards/${boardId}/lists`, startColumn.id);
                setDoc(docRef, {
                    taskIds: newTaskIds
                });
                return;
            }

            const startTaskIDs = Array.from(startColumn.taskIds);
            startTaskIDs.splice(source.index, 1);
            const newStart = {
                ...startColumn,
                taskIds: startTaskIDs,
            };

            const finishTaskIDs = Array.from(endColumn.taskIds);
            finishTaskIDs.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...endColumn,
                taskIds: finishTaskIDs,
            };

            const newState = {
                ...initialData,
                columns: {
                    ...initialData.columns,
                    [startColumn.id]: newStart,
                    [endColumn.id]: newFinish,
                },
            };

            setInitialData(newState);

            const docRef = doc(db, `boards/${boardId}/lists`, newStart.id);
            setDoc(docRef, {
                taskIds: startTaskIDs
            });
            const docRef2 = doc(db, `boards/${boardId}/lists`, newFinish.id);
            setDoc(docRef2, {
                taskIds: finishTaskIDs
            });
        } else {
            const newColumnOrder = Array.from(initialData.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            setInitialData({ ...initialData, columnOrder: newColumnOrder });
            const docRef = doc(db, `boards/${boardId}/lists`, "columnOrder");
            setDoc(docRef, {
                order: newColumnOrder,
            });
        }
    };

    const addCol = (e) => {
        e.preventDefault();
        const newColumnName = e.target.elements.newCol.value;
        const docRef = doc(db, `boards/${boardId}/lists`, newColumnName);
        setDoc(docRef, {
            title: newColumnName,
            taskIds: []
        });
        const docRef2 = doc(db, `boards/${boardId}/lists`, "columnOrder");
        updateDoc(docRef2, {
            order: firebase.firestore.FieldValue.arrayUnion(newColumnName),
        });
        e.target.elements.newCol.value = "";
    };

    const changeBoardName = debounce((ev) => {
        const docRef = doc(db, "boards", boardId);
        setDoc(docRef, {
            name: ev,
        });
    }, 1000);

    return (
      <>
        {initialData ? (
          <>
            <Modal modal={modal} setModal={setModal} ariaText="Add a new task">
              <AddTask
                boardId={boardId}
                userId={userId}
                allCols={initialData.columnOrder}
                close={() => setModal(false)}
              />
            </Modal>

            <main className="pb-2 h-screen w-screen">
              <div className="flex flex-col h-full">
                <header className="bg-white z-10 text-sm sm:text-base py-5 mx-3 md:mx-6">
                  <div className="flex flex-wrap justify-between items-center">
                    <span className="text-xl">
                      <Link
                        to="/"
                        className="text-blue-800 hover:text-blue-500"
                      >
                        Boards{" "}
                      </Link>
                      <span className="">/</span>
                      <input
                        type="text"
                        defaultValue={boardName}
                        className="text-gray-800 ml-2 w-1/2 truncate"
                        onChange={(e) => changeBoardName(e.target.value)}
                      />
                    </span>
                    <div className="flex flex-wrap items-center sm:space-x-9">
                      <div
                        className="bg-gradient-to-br from-primary via-indigo-600 to-blue-600 transform hover:scale-110 transition-all duration-300 rounded-full p-2 sm:p-1 fixed bottom-6 right-6 sm:static"
                        onClick={() => setModal(true)}
                      >
                        <Add />
                      </div>
                    </div>
                  </div>
                </header>

                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable
                    droppableId="allCols"
                    type="column"
                    direction="horizontal"
                  >
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="grid overflow-x-auto h-full items-start pt-3 md:pt-2 mx-1 md:mx-6 auto-cols-220 md:auto-cols-270 grid-flow-col"
                        style={{ height: "90%" }}
                      >
                        {initialData?.columnOrder.map((col, i) => {
                          const column = initialData?.columns[col];
                          const tasks = column.taskIds?.map((t) => t);
                          return (
                            <List
                              column={column}
                              tasks={tasks}
                              allData={initialData}
                              key={column.id}
                              boardId={boardId}
                              userId={userId}
                              index={i}
                            />
                          );
                        })}
                        {provided.placeholder}
                        <form
                          onSubmit={addCol}
                          autoComplete="off"
                          className="ml-2"
                        >
                          <input
                            maxLength="20"
                            className="truncate placeholder-indigo-500 text-indigo-800 bg-indigo-50 px-2 outline-none py-1 rounded-sm ring-2 focus:ring-indigo-500"
                            type="text"
                            name="newCol"
                            placeholder="Add a new column"
                          />
                        </form>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </main>
          </>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </>
    );
};

export default Kanban;
