import { Link } from "react-router-dom";

const HomeBoardList = ({ boards }) => {
  return (
    <div className=" h-screen px-6 py-4 sm:py-20 sm:px-24">
      <div className="flex flex-col my-2">
        <div className="my-12">
          <h1 className="text-xl text-blue-900">Your Boards</h1>
          <div className="flex flex-wrap mt-2">
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

export default HomeBoardList;
