import { useEffect, useState } from "react";
import Checklist from "./Checklist";
import Modal from "./Modal";
import {
  updateCard,
  deleteCard,
  addComment,
  getComments,
  deleteComment,
  setCardDueDate,
  setCardReminderDate,
  getCardLabel,
  AttachCardLabel,
  setCardStatus,
} from "../../controller/CardController";
import { auth, db } from "../../util/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Bin } from "./Icons";
import parse from "html-react-parser";
import { convertToLocalDateTime } from "../../util/utils";
import { doc } from "firebase/firestore";

const CardDetail = ({
  taskDetails,
  boardId,
  userId,
  columnDetails,
  closeModal,
  allFetch,
}) => {
  const [user] = useAuthState(auth.getAuth());
  const [updatedTitle, setTitle] = useState(taskDetails.title);
  const [updatedDesc, setNewDesc] = useState(taskDetails.description);
  const [CommentBody, setCommentBody] = useState("");
  const [modal, setModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState([]);

  useEffect(() => {
    fetch_comments();
    fetch_labels();
  }, []);
  const fetch_comments = async () => {
    let com = await getComments(boardId, taskDetails.id);
    setComments(com);
  };
  const fetch_labels = async () => {
    let labels = await getCardLabel(boardId);
    setLabel(labels);
  };

  const DueDate = () => {
    if (taskDetails.DueDate) {
      return (
        <input
          type="datetime-local"
          id="duedate"
          defaultValue={convertToLocalDateTime(taskDetails.DueDate.toDate())}
        ></input>
      );
    } else {
      return <input type="datetime-local" id="duedate"></input>;
    }
  };

  const ReminderDate = () => {
    if (taskDetails.DueDate) {
      return (
        <input
          type="datetime-local"
          id="reminderdate"
          defaultValue={convertToLocalDateTime(
            taskDetails.ReminderDate.toDate()
          )}
        ></input>
      );
    } else {
      return <input type="datetime-local" id="reminderdate"></input>;
    }
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
              onClick={(e) =>
                deleteCard(
                  e,
                  setModal,
                  closeModal,
                  boardId,
                  columnDetails,
                  taskDetails,
                  allFetch
                )
              }
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

      <form
        onSubmit={(e) => {
          updateCard(
            e,
            closeModal,
            boardId,
            taskDetails,
            updatedTitle,
            updatedDesc,
            allFetch
          );
        }}
        autoComplete="off"
      >
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
                allFetch={allFetch}
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
                  <div
                    name="desc"
                    className="border border-gray-300  px-4 py-3 outline-none h-56 w-full"
                    contentEditable="true"
                    onInput={(e) => setNewDesc(e.currentTarget.innerHTML)}
                    suppressContentEditableWarning={true}
                  >
                    {parse(taskDetails.description)}
                  </div>
                  {/* <textarea
                    name="desc"
                    className="border border-gray-300  px-4 py-3 outline-none h-56 w-full"
                    defaultValue={taskDetails.description}
                    onChange={(e) => }
                  /> */}
                  <div>
                    <div
                      onClick={() => setEditing(false)}
                      className="inline-block cursor-pointer text-gray-700 px-2 py-0.5 rounded-sm bg-gray-300"
                    >
                      Cancel
                    </div>
                  </div>
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

                {taskDetails.description === "" ||
                taskDetails.description === null
                  ? "Click here to add description"
                  : parse(updatedDesc)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 mt-12">
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

        <div className="my-12 flex justify-start w-full text-sm sm:text-base">
          {taskDetails.description !== updatedDesc ||
          taskDetails.title !== updatedTitle ? (
            <div className="bg-green-700 text-white px-2 py-1 rounded-sm transform hover:-translate-y-1 transition-transform duration-300 mr-4">
              <button className="cursor-pointer" type="submit">
                Save changes
              </button>
            </div>
          ) : null}

          <div
            className="border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-colors duration-300 px-2 py-0.5 rounded-sm"
            onClick={() => setModal(true)}
          >
            <p className="cursor-pointer">Delete Task</p>
          </div>
        </div>

        <div className="col-span-2 mt-12">
          <div className="mt-12">
            <label
              className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
              htmlFor="desc"
            >
              Due Date :
            </label>
            <h4 className="tracking-wide">
              <DueDate></DueDate>
              <button
                className="ml-10 bg-green-700 text-white px-2 py-1 rounded-sm transform hover:-translate-y-1 transition-transform duration-300"
                onClick={() => {
                  const duedate = new Date(
                    document.getElementById("duedate").value
                  );
                  setCardDueDate(boardId, taskDetails.id, duedate);
                }}
              >
                Save Due Date
              </button>
            </h4>
          </div>
        </div>
        <div className="col-span-2 mt-12">
          <div className="mt-12">
            <label
              className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
              htmlFor="desc"
            >
              Card Label
            </label>
            <h4 className="tracking-wide">
              <select id="cardlabels">
                {label.map((l) => {
                  if (taskDetails.labelId?.id == l.id) {
                    return (
                      <option value={l.labelColor} selected>
                        {l.labelName}
                      </option>
                    );
                  } else {
                    return <option value={l.labelColor}>{l.labelName}</option>;
                  }
                })}
              </select>
              <button
                className="ml-10 bg-green-700 text-white px-2 py-1 rounded-sm transform hover:-translate-y-1 transition-transform duration-300"
                onClick={() => {
                  const sel = document.getElementById("cardlabels");
                  const selected = document.getElementById("cardlabels").value;
                  AttachCardLabel(
                    boardId,
                    taskDetails.id,
                    sel.options[sel.selectedIndex].text,
                    selected
                  );
                }}
              >
                Attach Card Label
              </button>
            </h4>
          </div>
        </div>
        <div className="col-span-2 mt-12">
          <div className="mt-12">
            <label
              className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
              htmlFor="desc"
            >
              Reminder Date :
            </label>
            <h4 className="tracking-wide">
              <ReminderDate></ReminderDate>
              <button
                className="ml-10 bg-green-700 text-white px-2 py-1 rounded-sm transform hover:-translate-y-1 transition-transform duration-300"
                onClick={() => {
                  const reminderdate = new Date(
                    document.getElementById("reminderdate").value
                  );
                  setCardReminderDate(boardId, taskDetails.id, reminderdate);
                }}
              >
                Save Reminder Date
              </button>
            </h4>
          </div>
        </div>
        <div className="col-span-2 mt-12">
          <div className="mt-12">
            <label
              className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
              htmlFor="desc"
            >
              Card Status
            </label>
            <h4 className="tracking-wide">
              <select id="status">
                <option
                  value={"completed"}
                  selected={taskDetails?.Status == "completed"}
                >
                  Completed
                </option>
                <option
                  value={"overdue"}
                  selected={taskDetails?.Status == "overdue"}
                >
                  Overdue
                </option>
                <option
                  value={"ongoing"}
                  selected={taskDetails?.Status == "ongoing"}
                >
                  Ongoing
                </option>
              </select>
              <button
                className="ml-10 bg-green-700 text-white px-2 py-1 rounded-sm transform hover:-translate-y-1 transition-transform duration-300"
                onClick={() => {
                  const status = document.getElementById("status").value;
                  setCardStatus(boardId, taskDetails.id, status);
                }}
              >
                Save Card Status
              </button>
            </h4>
          </div>
        </div>
        <h1 className="text-2xl mt-10 mb-10">Comments</h1>
        {comments.map((c) => (
          <div className="flex mt-4 mb-4 max-w-lg">
            <div className="block w-full p-6 rounded-lg shadow-lg bg-white">
              <div className="flex justify-between text-gray-900 text-xl leading-tight font-medium mb-2">
                <div>{c.userName}</div>
                <div
                  className="text-red-600"
                  onClick={() => {
                    console.log("Clicked");
                    deleteComment(boardId, taskDetails.id, c.id);
                    fetch_comments();
                  }}
                >
                  <Bin></Bin>
                </div>
              </div>
              <p className="text-gray-700 text-base mb-4">{c.body}</p>
            </div>
          </div>
        ))}
        <div className="max-w-lg shadow-md">
          <div className="w-full p-4">
            <label className="block mb-2">
              <span className="text-gray-600">Add a comment</span>
              <textarea
                className="block w-full mt-1 rounded"
                rows="3"
                id="commentbody"
                onChange={(e) => {
                  setCommentBody(e.target.value);
                }}
              ></textarea>
            </label>
            <button
              className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("commentbody").value = "";
                addComment(
                  boardId,
                  taskDetails.id,
                  userId,
                  user.displayName,
                  CommentBody
                );
                fetch_comments();
              }}
            >
              Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardDetail;
