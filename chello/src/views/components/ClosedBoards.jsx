import { useEffect, useState } from "react";
import { getClosedBoard, openBoard } from "../../controller/BoardController";

const ClosedBoards = (workspaceId) => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        fetch_boards();
    }, []);
    const fetch_boards = async () => {
        const board = await getClosedBoard(workspaceId.workspaceId.workspaceId);
        setBoards(board);
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
                                        Board Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                    >
                                        Board Visibility Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {boards.map((b) => {
                                    return (
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {b.name}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {b.visibilitytype}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button
                                                    className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded"
                                                    onClick={async () => {
                                                        await openBoard(b.id);
                                                    }}
                                                >
                                                    Open
                                                </button>
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

export default ClosedBoards;
