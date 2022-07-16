import { Board } from "../model/Board";

export const BoardFactory = (userID, workspaceID, boardName) => {
  const board = new Board(userID, workspaceID, boardName);
  return board;
};
