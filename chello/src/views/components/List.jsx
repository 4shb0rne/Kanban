import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Card";

import { Bin, Add } from "./Icons";

import firebase from "firebase/compat/app";
import { db } from "../../util/firebase-config";
import { debounce } from "../../util/utils";
import { useRef } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import Modal from "../components/Modal";
import { useState } from "react";
import AddCard from "./AddCard";
const List = ({ column, tasks, allData, boardId, userId, index, allFetch }) => {
    const colInput = useRef(null);
    const [modal, setModal] = useState(false);
    const deleteCol = (colId, tasks) => {
        const docRef = doc(
            db.getDB(),
            `boards/${boardId}/lists`,
            "columnOrder"
        );
        updateDoc(docRef, {
            order: firebase.firestore.FieldValue.arrayRemove(colId),
        });
        const docRef2 = doc(db.getDB(), `boards/${boardId}/lists`, colId);
        deleteDoc(docRef2);
        tasks.forEach((t) => {
            deleteDoc(doc(db.getDB(), `boards/${boardId}/cards`, t));
        });
        allFetch();
    };

    const changeColName = debounce((e, colId) => {
        console.log(colId);
        const docRef = doc(db.getDB(), `boards/${boardId}/lists`, colId);

        console.log(e.target.value);
        updateDoc(docRef, {
            title: e.target.value,
        });
    }, 1000);
    return (
        <>
            <Modal modal={modal} setModal={setModal} ariaText="Add a new task">
                <AddCard
                    boardId={boardId}
                    userId={userId}
                    col={column.id}
                    close={() => setModal(false)}
                    allFetch={allFetch}
                />
            </Modal>
            <Draggable draggableId={column.id} index={index} key={column.id}>
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="mr-5"
                    >
                        <div className="bg-gray-300">
                            <div
                                {...provided.dragHandleProps}
                                className="bg-gradient-to-r bg-black flex items-center justify-between px-4 py-1 rounded-sm"
                            >
                                {
                                    //INI MASIH NGEBUG
                                }
                                <input
                                    ref={colInput}
                                    className={`sm:text-xl text-white text-lg px-2 w-10/12 bg-black`}
                                    type="text"
                                    defaultValue={column.id}
                                    onChange={(e) =>
                                        changeColName(e, column.id)
                                    }
                                />

                                <div>
                                    <div className="flex flex-wrap items-center">
                                        <div
                                            className="bg-gradient-to-br transform hover:scale-110 transition-all duration-300 rounded-full fixed bottom-6 right-6 sm:static"
                                            onClick={() => setModal(true)}
                                        >
                                            <button
                                                className="bg-green-500 text-white leading-tight uppercase rounded shadow-md hover:bg-green-600 
                      hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 
                      ease-in-out"
                                            >
                                                <Add></Add>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="text-red-600 hover:text-blue-50 cursor-pointer"
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
