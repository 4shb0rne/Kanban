import React from "react";
import { useBoards, useBoardsUser } from "../../controller/BoardController";
import BoardList from "../components/BoardList";
import { useParams } from "react-router-dom";

import { addNewBoard, deleteBoard } from "../../controller/BoardController";
import BoardListUser from "../components/BoardListUser";

export const Board = ({ userId, name }) => {
  let workspaceId = useParams();
  const [boards, fetchboards] = useBoards(userId, workspaceId);
  const [userboards, fetchuserboards] = useBoardsUser(userId);
  return boards !== null && userboards !== null ? (
    <div>
      <BoardList
        boards={boards}
        name={name}
        addNewBoard={addNewBoard}
        deleteBoard={deleteBoard}
        fetchBoards={fetchboards}
        userId={userId}
        workspaceId={workspaceId}
      ></BoardList>
      <BoardListUser boards={userboards}></BoardListUser>
    </div>
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
