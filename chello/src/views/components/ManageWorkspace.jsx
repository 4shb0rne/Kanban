import { async } from "@firebase/util";
import { useState, useEffect } from "react";
import {
  getAdmins,
  getUsers,
  changeVisibility,
  grantAdmin,
  revokeAdmin,
  removeMember,
  getWorkspace,
} from "../../controller/WorkspaceController";

export const ManageWorkspace = (WorkspaceID) => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [workspace, setworkspace] = useState(null);
  useEffect(() => {
    fetch_users();
    fetch_admins();
    fetch_workspace();
  }, []);
  const fetch_users = async () => {
    let user = await getUsers(WorkspaceID);
    setUsers(user);
  };
  const fetch_admins = async () => {
    let admin = await getAdmins(WorkspaceID);
    setAdmins(admin);
  };
  const fetch_workspace = async () => {
    let wp = await getWorkspace(WorkspaceID);
    setworkspace(wp);
  };
  return (
    <div>
      <form autoComplete="off">
        <div>
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
              grantAdmin(WorkspaceID, id);
            }}
          >
            Submit
          </button>
        </div>
      </form>
      <form autoComplete="off">
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
              removeMember(WorkspaceID, id);
            }}
          >
            Submit
          </button>
        </div>
      </form>
      <form autoComplete="off" className="mt-10">
        <div>
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
              revokeAdmin(WorkspaceID, id);
            }}
          >
            Submit
          </button>
        </div>
      </form>
      <form autoComplete="off" className="mt-10">
        <div>
          <h1>Workspace Visibility</h1>
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
                  selected={workspace?.visibilitytype == "public"}
                >
                  Public
                </option>
                <option
                  value="memberonly"
                  selected={workspace?.visibilitytype == "memberonly"}
                >
                  Member Only
                </option>
              </select>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
            onClick={async () => {
              let visibility = document.getElementById("visibility").value;
              await changeVisibility(WorkspaceID, visibility);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
