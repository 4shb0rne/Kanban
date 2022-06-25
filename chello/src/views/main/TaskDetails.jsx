import { useState } from "react";
import Checklist from "../components/Checklist";
import { db } from "../../util/firebase-config";
import firebase from "firebase/compat/app";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Modal from "../components/Modal";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
const TaskDetails = ({
  taskDetails,
  boardId,
  userId,
  columnDetails,
  closeModal,
  allFetch,
}) => {
  const [updatedTitle, setTitle] = useState(taskDetails.title);
  const [updatedPriority, setPriority] = useState(taskDetails.priority);
  const [updatedDesc, setNewDesc] = useState(taskDetails.description);
  const [modal, setModal] = useState(false);

  const [editing, setEditing] = useState(false);

  const updateCard = (e) => {
    e.preventDefault();
    closeModal();
    db.collection(`users/${userId}/boards/${boardId}/tasks`)
      .doc(taskDetails.id)
      .update({
        title: updatedTitle,
        priority: updatedPriority,
        description: updatedDesc,
      });
  };

  const deleteCard = async (e) => {
    setModal(false);
    closeModal();
    // db.collection(`users/${userId}/boards/${boardId}/columns`)
    //   .doc(columnDetails.id)
    //   .update({
    //     taskIds: firebase.firestore.FieldValue.arrayRemove(taskDetails.id),
    //   });
    // db.collection(`users/${userId}/boards/${boardId}/tasks`)
    //   .doc(taskDetails.id)
    //   .delete();

    const docRef = doc(db, `boards/${boardId}/lists`, columnDetails.id);
    await updateDoc(docRef, {
      taskIds: firebase.firestore.FieldValue.arrayRemove(taskDetails.id),
    });
    const docRef2 = doc(db, `boards/${boardId}/cards`, taskDetails.id);
    await deleteDoc(docRef2);
    allFetch();
  };

  return (
    <div className="md:px-12 text-sm md:text-base">
      <Modal
        modal={modal}
        setModal={setModal}
        ariaText="Task Delete confirmation"
      >
        <div className="md:px-12">
          <h2 className="text-base md:text-2xl text-gray-900">
            Are you sure you want to delete this card?
          </h2>
          <div className="my-8 flex">
            <button
              className="bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg 
              focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 
              active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out px-6 py-2"
              onClick={deleteCard}
            >
              Yes
            </button>
            <button
              className="bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
            focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out px-6 py-2 mx-2"
              onClick={() => setModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>

      <form onSubmit={updateCard} autoComplete="off">
        <div>
          <label
            className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            maxLength="45"
            type="text"
            name="title"
            className="text-xl md:text-2xl w-full inline-block outline-none"
            defaultValue={taskDetails.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="lg:grid lg:grid-cols-8 gap-x-20 w-full">
          {/* First column */}
          <div className="col-span-6 mt-12">
            <div>
              <label className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block">
                Checklist:
              </label>
              <Checklist
                todos={taskDetails.todos}
                taskId={taskDetails.id}
                boardId={boardId}
                userId={userId}
              />
            </div>

            <div className="mt-12 w-full">
              <div className={`${editing ? "" : "hidden"}`}>
                <div className="">
                  <label
                    className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
                    htmlFor="desc"
                  >
                    Description:
                  </label>
                  <textarea
                    name="desc"
                    className="border border-gray-300  px-4 py-3 outline-none h-56 w-full"
                    defaultValue={taskDetails.description}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                  <div>
                    <div
                      onClick={() => setEditing(false)}
                      className="inline-block cursor-pointer text-gray-700 px-2 py-0.5 rounded-sm bg-gray-300"
                    >
                      Cancel
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm block"
                    htmlFor="desc"
                  >
                    Live Preview:
                  </label>
                  <ReactMarkdown
                    plugins={[gfm]}
                    className="border border-gray-200 px-2 py-3 overflow-y-auto leading-normal  prose text-sm sm:text-base leading-tight text-gray-900"
                  >
                    {updatedDesc}
                  </ReactMarkdown>
                </div>
              </div>

              <div
                className={`${editing ? "hidden" : ""}`}
                onClick={() => setEditing(true)}
              >
                <label
                  className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
                  htmlFor="desc"
                >
                  Description:
                </label>
                <ReactMarkdown
                  plugins={[gfm]}
                  className="border border-gray-200 bg-gray-50 px-2 py-3 overflow-y-auto prose text-sm sm:text-base leading-normal  text-gray-900"
                >
                  {taskDetails.description === "" ||
                  taskDetails.description === null
                    ? "*No description yet, type here to add*"
                    : updatedDesc}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Second column */}
          <div className="col-span-2 mt-12">
            <div className="">
              <label
                className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
                htmlFor="title"
              >
                Priority:
              </label>
              <div className="flex items-center">
                <select
                  name="priority"
                  defaultValue={taskDetails.priority}
                  className="select"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option className="option" value="high">
                    High
                  </option>
                  <option className="option" value="medium">
                    Medium
                  </option>
                  <option className="option" value="low">
                    Low
                  </option>
                </select>
              </div>
            </div>

            {taskDetails.dateAdded ? (
              <div className="mt-12">
                <label
                  className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
                  htmlFor="desc"
                >
                  Date Added:
                </label>
                <h4 className="tracking-wide">
                  {
                    new Date(taskDetails.dateAdded.seconds * 1000)
                      .toLocaleString()
                      .split(",")[0]
                  }
                </h4>
              </div>
            ) : null}
          </div>
        </div>

        {/* Buttons */}
        <div className="my-12 flex justify-end w-full text-sm sm:text-base">
          {taskDetails.description !== updatedDesc ||
          taskDetails.title !== updatedTitle ||
          taskDetails.priority !== updatedPriority ? (
            <div className="bg-green-700 text-white px-2 py-1 rounded-sm transform hover:-translate-y-1 transition-transform duration-300">
              <button className="cursor-pointer" type="submit">
                Save changes
              </button>
            </div>
          ) : null}

          <div
            className="border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-colors duration-300 px-2 py-0.5 rounded-sm ml-4"
            onClick={() => setModal(true)}
          >
            <p className="cursor-pointer">Delete Task</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
