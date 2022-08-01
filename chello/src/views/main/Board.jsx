import React, { useEffect } from "react";
import { useBoards, useBoardsUser } from "../../controller/BoardController";
import BoardList from "../components/BoardList";
import { useParams } from "react-router-dom";
import { auth } from "../../util/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { addNewBoard, deleteBoard } from "../../controller/BoardController";
import BoardListUser from "../components/BoardListUser";

//kalo direload jadi error soalnya g dpt userIdnya
export const Board = ({ userId, name }) => {
  let workspaceId = useParams();
  const [boards, fetchboards] = useBoards(userId, workspaceId);
  const [userboards, fetchuserboards] = useBoardsUser(userId, workspaceId);
  useEffect(() => {
    fetchboards();
  }, []);
  useEffect(() => {
    fetchuserboards();
  }, []);

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
