import { Link } from "react-router-dom";
import { useState } from "react";

import Modal from "./Modal";
import { Exclaim, Bin } from "./Icons";

const WorkspaceList = ({
    logOut,
    workspaces,
    addNewWorkspace,
    deleteWorkspace,
    name,
}) => {
    const [modal, setModal] = useState(false);
    const [idToBeDeleted, setId] = useState(null);

    const removeBoard = (id) => {
        setModal(false);
        deleteWorkspace(id);
    };
    return (
        <div className="bg-gradient-to-br from-white via-indigo-100 to-primary h-screen px-6 py-4 sm:py-20 sm:px-24">
            <div className="flex flex-col my-2">
                <div className="flex justify-between">
                    <h1 className="text-xl sm:text-3xl bg-gradient-to-r from-indigo-500 to-primary bg-clip-text">
                        Welcome, {name ? name.split(" ")[0] : "Anonymous"}
                    </h1>
                </div>
                <form
                    onSubmit={addNewWorkspace}
                    autoComplete="off"
                    className="my-4 sm:my-8"
                >
                    <label
                        htmlFor="workspaceName"
                        className="block text-xl text-blue-900"
                    >
                        Make a new Workspace
                    </label>
                    <div className="flex items-center mt-2">
                        <input
                            required
                            type="text"
                            name="workspaceName"
                            className="bg-transparent border border-gray-500 px-2 py-1 rounded-sm placeholder-gray-700"
                            placeholder="Enter a workspace name"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-900 text-green-50  rounded-sm px-2 py-1.5"
                        >
                            Add
                        </button>
                    </div>
                </form>
                <div className="my-12">
                    <h1 className="text-xl text-blue-900">Your Workspaces</h1>
                    <div className="flex flex-wrap mt-2">
                        {workspaces.map((w) => (
                            <div
                                className="bg-white text-gray-700 mb-3 mr-4 py-4 px-6 rounded-sm shadow-md w-full sm:w-auto"
                                key={w.id}
                            >
                                <div className="flex items-center justify-between">
                                    <Link to={`/workspace/${w.id}`}>
                                        <h2 className="text-lg sm:text-2xl text-gray-700 hover:text-gray-900">
                                            {w.name}
                                        </h2>
                                    </Link>
                                    <div
                                        onClick={() => deleteWorkspace(w.id)}
                                        className="text-red-500 ml-6 cursor-pointer hover:text-red-700"
                                    >
                                        <Bin />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {workspaces.length === 0 ? (
                            <h1 className="text-gray-700">
                                No Boards created yet. Why don't you go ahead
                                and create one?
                            </h1>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceList;
