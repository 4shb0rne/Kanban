import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Checked, Unchecked, Cross, Dragger } from "./Icons";
import { db } from "../../util/firebase-config";
import { useState, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";

import {
  addSubTask,
  checkMark,
  deleteSubTask,
} from "../../controller/CheckListController";

const Checklist = ({ todos, taskId, boardId, allFetch }) => {
  const [todoList, setList] = useState(todos);
  const newTaskRef = useRef(null);

  const endOfDrag = async (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const toBeMoved = todoList[source.index];
    const newOrder = [...todoList];
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, toBeMoved);
    setList(newOrder);
    const docRef = doc(db, `boards/${boardId}/cards`, taskId);
    await updateDoc(docRef, {
      todos: newOrder,
    });
    allFetch();
  };

  return (
    <div>
      <DragDropContext onDragEnd={endOfDrag} className="bg-gray-600">
        <Droppable droppableId={"Checklist"}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoList.map((t, i) => (
                <Draggable draggableId={t.task} index={i} key={t.id}>
                  {(provided, snapshot) => (
                    <div
                      className="flex items-center mt-3 w-full justify-between pr-6"
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <div className="flex w-2/3">
                        <div
                          className="mr-1"
                          onClick={(e) =>
                            checkMark(e, t, boardId, taskId, allFetch, todoList)
                          }
                        >
                          {t.done ? <Checked /> : <Unchecked />}
                        </div>
                        <h4
                          className={`ml-2 ${
                            t.done ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {t.task}
                        </h4>
                      </div>
                      <div
                        className="text-red-400 hover:text-red-700 cursor-pointer"
                        onClick={() =>
                          deleteSubTask(
                            t.task,
                            todoList,
                            boardId,
                            taskId,
                            allFetch,
                            setList
                          )
                        }
                      >
                        <Cross />
                      </div>
                      <div
                        {...provided.dragHandleProps}
                        className="text-gray-600"
                      ></div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <input
        maxLength="40"
        ref={newTaskRef}
        type="text"
        name="task"
        placeholder="Add a task"
        onKeyPress={(e) =>
          addSubTask(
            e,
            boardId,
            taskId,
            allFetch,
            setList,
            todoList,
            newTaskRef
          )
        }
        className="border-b border-gray-300 outline-none my-3 w-full"
      />
    </div>
  );
};

export default Checklist;
