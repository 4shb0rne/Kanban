import { Link } from "react-router-dom";
import { Bin, Add, Edit } from "./Icons";
import { InviteWorkspaceMember } from "./InviteWorkspaceMember";
import { useState } from "react";
import Modal from "./Modal";
import { ManageWorkspace } from "./ManageWorkspace";
const WorkspaceList = ({
    workspaces,
    addNewWorkspace,
    deleteWorkspace,
    name,
    fetchWorkspaces,
    userId,
}) => {
    const [modal, setModal] = useState(false);
    const [manageModal, setManageModal] = useState(false);
    return (
        <div className="h-screen px-6 py-4 sm:py-20 sm:px-24">
            <div className="flex flex-col my-2">
                <div className="flex justify-between">
                    <h1 className="text-xl sm:text-3xl bg-gradient-to-r from-indigo-500 to-primary bg-clip-text">
                        Welcome, {name ? name.split(" ")[0] : "Anonymous"}
                    </h1>
                </div>
                <form
                    onSubmit={(e) =>
                        addNewWorkspace(e, userId, fetchWorkspaces)
                    }
                    autoComplete="off"
                    className="my-4 sm:my-8"
                >
                    <label
                        htmlFor="workspaceName"
                        className="block text-xl text-blue-900"
                    >
                        Insert new workspace
                    </label>
                    <div className="mt-2">
                        <input
                            required
                            type="text"
                            name="workspaceName"
                            className="bg-transparent border border-gray-500 px-2 py-1 rounded-sm placeholder-gray-700"
                            placeholder="Enter a workspace name"
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
                    <h1 className="text-xl text-blue-900">
                        Your Workspaces(Admin)
                    </h1>
                    <div className="flex flex-wrap mt-2">
                        {workspaces.map((w) => (
                            <div
                                className="bg-white text-gray-700 mb-3 mr-4 py-4 px-6 rounded-sm shadow-md w-full sm:w-auto"
                                key={w.id}
                            >
                                <Modal
                                    modal={modal}
                                    setModal={setModal}
                                    ariaText="Workspace Invitation"
                                >
                                    <InviteWorkspaceMember
                                        UserID={userId}
                                        WorkspaceID={w.id}
                                        WorkspaceName={w.name}
                                        AdminName={name}
                                    ></InviteWorkspaceMember>
                                </Modal>
                                <Modal
                                    modal={manageModal}
                                    setModal={setManageModal}
                                    ariaText="Manage Workspace"
                                >
                                    <ManageWorkspace
                                        WorkspaceID={w.id}
                                    ></ManageWorkspace>
                                </Modal>
                                <div className="flex items-center justify-between">
                                    <Link to={`/workspace/${w.id}`}>
                                        <h2 className="text-lg sm:text-2xl text-gray-700 hover:text-gray-900">
                                            {w.name}
                                        </h2>
                                    </Link>
                                    <div
                                        className="ml-6 mt-2 cursor-pointer"
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
                                    <div
                                        onClick={() =>
                                            deleteWorkspace(
                                                w.id,
                                                fetchWorkspaces
                                            )
                                        }
                                        className="text-red-500 ml-3 cursor-pointer hover:text-red-700"
                                    >
                                        <Bin />
                                    </div>
                                    <button
                                        onClick={() => setManageModal(true)}
                                    >
                                        <Edit></Edit>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {workspaces.length === 0 ? (
                            <h1 className="text-gray-700">No Workspaces</h1>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceList;
