import { Link, useNavigate } from "react-router-dom";
import { Bin, Add, Edit } from "./Icons";
import { leaveWorkspace } from "../../controller/WorkspaceController";
import { useState } from "react";
import Modal from "./Modal";
import { InviteBoardMember } from "./InviteBoardMember";
import { ManageBoard } from "./ManageBoard";
import UserList from "./UserList";
const BoardList = ({
  logOut,
  boards,
  addNewBoard,
  deleteBoard,
  name,
  fetchBoards,
  userId,
  workspaceId,
}) => {
  const [modal, setModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  let navigate = useNavigate();
  const [boardId, setBoardId] = useState("");
  const [boardName, setBoardName] = useState("");
  const removeBoard = (id) => {
    deleteBoard(id, fetchBoards);
  };
  return (
    <div className=" h-screen px-6 py-4 sm:py-20 sm:px-24">
      <div className="flex flex-col my-2">
        <div className="flex justify-between">
          <h1 className="text-xl sm:text-3xl bg-gradient-to-r from-indigo-500 to-primary bg-clip-text">
            Welcome, {name ? name.split(" ")[0] : "Anonymous"}
          </h1>
          <div>
            <button
              className="inline-block px-6 py-2.5 m-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded"
              onClick={() => {
                setUserModal(true);
              }}
            >
              Workspace Member
            </button>
            <button
              className="inline-block px-6 py-2.5 m-3 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => {
                leaveWorkspace(workspaceId, userId);
                navigate("/");
              }}
            >
              Leave Workspace
            </button>
          </div>
        </div>
        <form
          onSubmit={(e) => addNewBoard(e, fetchBoards, userId, workspaceId)}
          autoComplete="off"
          className="my-4 sm:my-8"
        >
          <label htmlFor="boardName" className="block text-xl text-blue-900">
            Insert new board
          </label>
          <div className="mt-2">
            <input
              required
              type="text"
              name="boardName"
              className="bg-transparent border border-gray-500 px-2 py-1 rounded-sm placeholder-gray-700"
              placeholder="Enter a board name"
            />
            <div className="mt-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-900 text-green-50  rounded-sm px-12 py-2"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <div className="my-12">
          <h1 className="text-xl text-blue-900">Your Boards(Admin)</h1>
          <div className="flex flex-wrap mt-2">
            <Modal
              modal={modal}
              setModal={setModal}
              ariaText="Board Invitation"
            >
              <InviteBoardMember
                UserID={userId}
                WorkspaceID={workspaceId}
                BoardID={boardId}
                BoardName={boardName}
                AdminName={name}
              ></InviteBoardMember>
            </Modal>
            <Modal
              modal={manageModal}
              setModal={setManageModal}
              ariaText="Board Invitation"
            >
              <ManageBoard boardId={boardId} userId={userId}></ManageBoard>
            </Modal>
            <Modal
              modal={userModal}
              setModal={setUserModal}
              ariaText="User List"
            >
              <UserList workspaceId={workspaceId}></UserList>
            </Modal>
            {boards.map((b) => (
              <div
                className="bg-white text-gray-700 mb-3 mr-4 py-4 px-6 rounded-sm shadow-md w-full sm:w-auto"
                key={b.id}
              >
                {b.title}
                <div className="flex items-center justify-between">
                  <Link to={`/board/${b.id}`}>
                    <h2 className="text-lg sm:text-2xl text-gray-700 hover:text-gray-900">
                      {b.name}
                    </h2>
                  </Link>

                  <div
                    className="ml-6 mt-2 cursor-pointer"
                    onClick={() => {
                      setModal(true);
                      setBoardId(b.id);
                      setBoardName(b.name);
                    }}
                  >
                    <button
                      className="bg-green-500 text-white leading-tight uppercase rounded shadow-md hover:bg-green-600 
                      hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 
                      ease-in-out"
                    >
                      <Add></Add>
                    </button>
                  </div>
                  <div
                    onClick={() => removeBoard(b.id)}
                    className="text-red-500 ml-6 cursor-pointer hover:text-red-700"
                  >
                    <Bin />
                  </div>
                  <button
                    onClick={() => {
                      setManageModal(true);
                      setBoardId(b.id);
                    }}
                  >
                    <Edit></Edit>
                  </button>
                </div>
              </div>
            ))}
            {boards.length === 0 ? (
              <h1 className="text-gray-700">No Boards</h1>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
