import { Link } from "react-router-dom";
const WorkspaceListUser = ({ workspaces }) => {
  return (
    <div className="h-screen px-6 sm:px-24">
      <div className="flex flex-col my-2">
        <div className="my-12">
          <h1 className="text-xl text-blue-900">Your Workspaces(User)</h1>
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

export default WorkspaceListUser;
