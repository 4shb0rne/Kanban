import { useEffect, useState } from "react";
import {
    getAdmins,
    getUsers,
    changeVisibility,
    grantAdmin,
    revokeAdmin,
    moveBoard,
    kickUser,
    getBoard,
} from "../../controller/BoardController";
import { auth } from "../../util/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAvailableWorkspace } from "../../controller/WorkspaceController";

export const ManageBoard = (boardId, userId) => {
    const [user] = useAuthState(auth.getAuth());
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [workspaces, setWorkspaces] = useState([]);
    const [board, setBoard] = useState(null);
    useEffect(() => {
        fetch_users();
        fetch_admins();
        fetch_workspaces();
        fetch_board();
    }, []);
    const fetch_users = async () => {
        let user = await getUsers(boardId);
        setUsers(user);
    };
    const fetch_admins = async () => {
        let admin = await getAdmins(boardId);
        setAdmins(admin);
    };
    const fetch_workspaces = async () => {
        let workspace = await getAvailableWorkspace(user.uid);
        setWorkspaces(workspace);
    };
    const fetch_board = async () => {
        let b = await getBoard(boardId);
        setBoard(b);
    };
    return (
        <div>
            <div className="mt-10">
                <h1>Grant Admin</h1>
                <div className="flex mt-2">
                    <div className="xl:w-96">
                        <select
                            id="userlist"
                            className="form-select form-select-lg
                                    appearance-none
                                    block
                                    w-full
                                    px-4
                                    py-2
                                    text-xl
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label=".form-select-lg example"
                        >
                            {users.map((u) => (
                                <option value={u.id}>{u.username}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
                    onClick={() => {
                        let id = document.getElementById("userlist").value;
                        grantAdmin(boardId, id);
                    }}
                >
                    Submit
                </button>
            </div>
            <div className="mt-10">
                <h1>Revoke Admin</h1>
                <div className="flex mt-2">
                    <div className="xl:w-96">
                        <select
                            id="adminlist"
                            className="form-select form-select-lg
                                                appearance-none
                                                block
                                                w-full
                                                px-4
                                                py-2
                                                text-xl
                                                font-normal
                                                text-gray-700
                                                bg-white bg-clip-padding bg-no-repeat
                                                border border-solid border-gray-300
                                                rounded
                                                transition
                                                ease-in-out
                                                m-0
                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        >
                            {admins.map((a) => (
                                <option value={a.id}>{a.username}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
                    onClick={(e) => {
                        let id = document.getElementById("adminlist").value;
                        revokeAdmin(boardId, id);
                    }}
                >
                    Submit
                </button>
            </div>
            <div className="mt-10">
                <h1>Board Visibility</h1>
                <div className="flex mt-2">
                    <div className="xl:w-96">
                        <select
                            className="form-select form-select-lg
                                                appearance-none
                                                block
                                                w-full
                                                px-4
                                                py-2
                                                text-xl
                                                font-normal
                                                text-gray-700
                                                bg-white bg-clip-padding bg-no-repeat
                                                border border-solid border-gray-300
                                                rounded
                                                transition
                                                ease-in-out
                                                m-0
                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="visibility"
                        >
                            <option
                                value="public"
                                selected={board?.visibilitytype == "public"}
                            >
                                Public
                            </option>
                            <option
                                value="memberonly"
                                selected={board?.visibilitytype == "memberonly"}
                            >
                                Member Only
                            </option>
                        </select>
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
                    onClick={() => {
                        let visibility =
                            document.getElementById("visibility").value;
                        changeVisibility(boardId, visibility);
                    }}
                >
                    Submit
                </button>
            </div>
            <div className="mt-10">
                <h1>Move Board</h1>
                <div className="flex mt-2">
                    <div className="xl:w-96">
                        <select
                            className="form-select form-select-lg
                                                appearance-none
                                                block
                                                w-full
                                                px-4
                                                py-2
                                                text-xl
                                                font-normal
                                                text-gray-700
                                                bg-white bg-clip-padding bg-no-repeat
                                                border border-solid border-gray-300
                                                rounded
                                                transition
                                                ease-in-out
                                                m-0
                                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="workspaceslist"
                        >
                            {workspaces.map((w) => (
                                <option value={w.id}>{w.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
                    onClick={() => {
                        let workspaceid =
                            document.getElementById("workspaceslist").value;
                        moveBoard(workspaceid, boardId);
                    }}
                >
                    Submit
                </button>
            </div>
            <div className="mt-3">
                <h1>Kick User</h1>
                <div className="flex mt-2">
                    <div className="xl:w-96">
                        <select
                            id="kicklist"
                            className="form-select form-select-lg
                                appearance-none
                                block
                                w-full
                                px-4
                                py-2
                                text-xl
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding bg-no-repeat
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label=".form-select-lg example"
                        >
                            {users.map((u) => (
                                <option value={u.id}>{u.username}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
                    onClick={() => {
                        let id = document.getElementById("kicklist").value;
                        kickUser(boardId, id);
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};
