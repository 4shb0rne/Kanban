import React from "react";
import useBoards from "../../controller/BoardController";
import BoardList from "../components/BoardList";
import { useParams } from "react-router-dom";

import { addNewBoard, deleteBoard } from "../../controller/BoardController";

export const Board = ({ userId, name }) => {
  let workspaceId = useParams();
  const [boards, fetchboards] = useBoards(userId);

  return boards !== null ? (
    <BoardList
      boards={boards}
      name={name}
      addNewBoard={addNewBoard}
      deleteBoard={deleteBoard}
      fetchBoards={fetchboards}
      userId={userId}
      workspaceId={workspaceId}
    ></BoardList>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
