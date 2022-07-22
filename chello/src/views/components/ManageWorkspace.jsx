import { useState, useEffect } from "react";
import { getAdmins } from "../../controller/WorkspaceController";

export const ManageWorkspace = (WorkspaceID) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch_users();
    }, []);
    const fetch_users = () => {
        // let user = getAdmins(WorkspaceID);
        // setUsers(user);
    };
    return (
        <div>
            <form autoComplete="off">
                <div>
                    <h1>Grant Admin</h1>
                    <div class="flex mt-2">
                        <div class="xl:w-96">
                            <select
                                class="form-select form-select-lg
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
                            ></select>
                        </div>
                    </div>
                    <input
                        type="submit"
                        className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
                        value="Submit"
                    />
                </div>
            </form>
            <form autoComplete="off" className="mt-10">
                <div>
                    <h1>Revoke Admin</h1>
                    <div class="flex mt-2">
                        <div class="xl:w-96">
                            <select
                                class="form-select form-select-lg
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
                                <option selected>Open this select menu</option>
                            </select>
                        </div>
                    </div>
                    <input
                        type="submit"
                        className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
                        value="Submit"
                    />
                </div>
            </form>
        </div>
    );
};
