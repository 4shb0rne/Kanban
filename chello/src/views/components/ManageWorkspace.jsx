import { useState, useEffect } from "react";
import { getAdmins, getUsers } from "../../controller/WorkspaceController";

export const ManageWorkspace = (WorkspaceID) => {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        fetch_users();
    }, []);
    useEffect(() => {
        fetch_admins();
    }, []);
    const fetch_users = async () => {
        let user = await getUsers(WorkspaceID);
        setUsers(user);
    };
    const fetch_admins = async () => {
        let admin = await getAdmins(WorkspaceID);
        setAdmins(admin);
    };

    return (
        <div>
            <form autoComplete="off">
                <div>
                    <h1>Grant Admin</h1>
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
                                aria-label=".form-select-lg example"
                            ></select>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
                        onClick={() => {}}
                    />
                </div>
            </form>
            <form autoComplete="off" className="mt-10">
                <div>
                    <h1>Revoke Admin</h1>
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
                            >
                                {admins.map((a) => (
                                    <option value={a.id}>{a.username}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
                        onClick={() => {}}
                    />
                </div>
            </form>
        </div>
    );
};
