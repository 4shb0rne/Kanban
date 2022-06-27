import { Link } from "react-router-dom";
import { Bin } from "./Icons";

const BoardList = ({ logOut, boards, addNewBoard, deleteBoard, name }) => {
    const removeBoard = (id) => {
        deleteBoard(id);
    };
    return (
        <div className=" h-screen px-6 py-4 sm:py-20 sm:px-24">
            <div className="flex flex-col my-2">
                <div className="flex justify-between">
                    <h1 className="text-xl sm:text-3xl bg-gradient-to-r from-indigo-500 to-primary bg-clip-text">
                        Welcome, {name ? name.split(" ")[0] : "Anonymous"}
                    </h1>
                </div>
                <form
                    onSubmit={addNewBoard}
                    autoComplete="off"
                    className="my-4 sm:my-8"
                >
                    <label
                        htmlFor="boardName"
                        className="block text-xl text-blue-900"
                    >
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
                                    <div
                                        onClick={() => removeBoard(b.id)}
                                        className="text-red-500 ml-6 cursor-pointer hover:text-red-700"
                                    >
                                        <Bin />
                                    </div>
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
