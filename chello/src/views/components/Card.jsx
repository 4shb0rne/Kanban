import { Draggable } from "react-beautiful-dnd";
import ChecklistProgress from "./ChecklistProgress";

import Modal from "./Modal";
import CardDetail from "./CardDetail";
import { Description } from "./Icons";
import { useState } from "react";

const Card = ({
    allData,
    id,
    index,
    boardId,
    userId,
    columnDetails,
    allFetch,
}) => {
    const [modal, setModal] = useState(false);

    const theTask = allData.tasks[id];

    return (
        <div>
            <Modal modal={modal} setModal={setModal} ariaText="Task Details">
                <CardDetail
                    taskDetails={theTask}
                    closeModal={() => setModal(false)}
                    boardId={boardId}
                    userId={userId}
                    columnDetails={columnDetails}
                    allFetch={allFetch}
                />
            </Modal>

            <Draggable draggableId={id} index={index}>
                {(provided, snapshot) => (
                    <div
                        onClick={() => setModal(true)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`shadow-lg transition-shadow duration-300 hover:shadow-xl mb-4 rounded px-1.5 py-2.5 ${
                            snapshot.isDragging
                                ? "bg-gradient-to-r from-red-100 to-blue-100 text-gray-900"
                                : "bg-white text-gray-800"
                        }`}
                    >
                        <div className="w-full">
                            <h4 className="text-sm sm:text-base">
                                {theTask.title}
                            </h4>
                            <div className="flex mt-2 space-x-3 sm:space-x-5">
                                {theTask.todos.length >= 1 && (
                                    <ChecklistProgress todos={theTask.todos} />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        </div>
    );
};

export default Card;
