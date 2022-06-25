import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";

import { Bin, Exclaim } from "./Icons";

import firebase from "firebase/compat/app";
import { db } from "../../util/firebase-config";
import { debounce } from "../../util/utils";
import { useState, useRef } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
const List = ({
  column,
  tasks,
  allData,
  boardId,
  userId,
  filterBy,
  index,
  allFetch,
}) => {
  const [editingCol, setEditing] = useState(false);
  const colInput = useRef(null);

  const deleteCol = (colId, tasks) => {
    const docRef = doc(db, `boards/${boardId}/lists`, "columnOrder");
    updateDoc(docRef, {
      order: firebase.firestore.FieldValue.arrayRemove(colId),
    });
    const docRef2 = doc(db, `boards/${boardId}/lists`, colId);
    deleteDoc(docRef2);
    tasks.forEach((t) => {
      deleteDoc(doc(db, `boards/${boardId}/cards`, t));
    });
    allFetch();
  };

  const changeColName = debounce((e, colId) => {
    console.log(colId);
    const docRef = doc(db, `boards/${boardId}/lists`, colId);

    console.log(e.target.value);
    updateDoc(docRef, {
      title: e.target.value,
    });
  }, 1000);
  return (
    <>
      <Draggable draggableId={column.id} index={index} key={column.id}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="mr-5"
          >
            <div style={{ background: "#edf2ff" }}>
              <div
                {...provided.dragHandleProps}
                className="bg-gradient-to-r bg-blue-700 flex items-center justify-between px-4 py-1 rounded-sm"
              >
                {
                  console.log(column) //INI MASIH NGEBUG
                }
                <input
                  ref={colInput}
                  className={`sm:text-xl text-white text-lg px-2 w-10/12 bg-blue-700`}
                  onBlur={() => setEditing(false)}
                  type="text"
                  defaultValue={column.id}
                  onChange={(e) => changeColName(e, column.id)}
                />
                <div
                  className="text-blue-700 hover:text-blue-50 cursor-pointer"
                  onClick={() => deleteCol(column.id, tasks)}
                >
                  <Bin />
                </div>
              </div>
              <Droppable droppableId={column.id} type="task">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`h-full py-4 px-2 ${
                      snapshot.isDraggingOver
                        ? "bg-gradient-to-br from-green-400 via-green-200 to-green-100"
                        : ""
                    }`}
                  >
                    {tasks.map((t, i) => (
                      <Task
                        allData={allData}
                        id={t}
                        index={i}
                        key={t}
                        boardId={boardId}
                        userId={userId}
                        columnDetails={column}
                        filterBy={filterBy}
                        allFetch={allFetch}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default List;
