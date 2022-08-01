import { useEffect, useState } from "react";
import { getAllUsers } from "../../controller/WorkspaceController";

const UserList = (workspaceId) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch_users();
  }, []);
  const fetch_users = async () => {
    const user = await getAllUsers(workspaceId.workspaceId.workspaceId);
    setUsers(user);
  };
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  return (
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {u.username}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {u.useremail}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {u.role}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
