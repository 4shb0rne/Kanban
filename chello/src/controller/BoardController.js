import { useState, useEffect } from "react";
import { db } from "../util/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  deleteDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { BoardFactory } from "../factory/BoardFactory";
import { Board } from "../model/Board";

export const useBoardsHomeAdmin = (userId) => {
  const [boards, setBoards] = useState(null);
  const fetch_boards = () => {
    const docRef = doc(db.getDB(), "users", userId);
    getDoc(docRef).then((docSnap) => {
      try {
        if (docSnap.exists()) {
          const userRef = {
            userid: docSnap.ref,
            role: "admin",
          };
          getDocs(
            query(
              collection(db.getDB(), "boards"),
              where("users", "array-contains", userRef)
            )
          ).then((boardSnap) => {
            const documents = [];
            boardSnap.forEach((b) => {
              documents.push({
                id: b.id,
                ...b.data(),
              });
            });
            setBoards(documents);
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
  };
  useEffect(() => {
    fetch_boards();
    return () => {
      setBoards(null);
    };
  }, [userId]);

  return [boards, fetch_boards];
};

export const useBoards = (userId, workspaceId) => {
  const [boards, setBoards] = useState(null);
  const fetch_boards = () => {
    const docRef = doc(db.getDB(), "users", userId);
    getDoc(docRef).then((docSnap) => {
      try {
        if (docSnap.exists()) {
          const userRef = {
            userid: docSnap.ref,
            role: "admin",
          };
          const workspace = doc(
            db.getDB(),
            "workspaces",
            workspaceId.workspaceId
          );
          getDocs(
            query(
              collection(db.getDB(), "boards"),
              where("users", "array-contains", userRef),
              where("workspace", "==", workspace)
            )
          ).then((boardSnap) => {
            const documents = [];
            boardSnap.forEach((b) => {
              documents.push({
                id: b.id,
                ...b.data(),
              });
            });
            setBoards(documents);
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
  };
  useEffect(() => {
    fetch_boards();
    return () => {
      setBoards(null);
    };
  }, [userId]);

  return [boards, fetch_boards];
};

export const useBoardsUser = (userId) => {
  const [boards, setBoards] = useState(null);
  const fetch_boards = () => {
    const docRef = doc(db.getDB(), "users", userId);
    getDoc(docRef).then((docSnap) => {
      try {
        if (docSnap.exists()) {
          const userRef = {
            userid: docSnap.ref,
            role: "user",
          };
          getDocs(
            query(
              collection(db.getDB(), "boards"),
              where("users", "array-contains", userRef)
            )
          ).then((boardSnap) => {
            const documents = [];
            boardSnap.forEach((b) => {
              documents.push({
                id: b.id,
                ...b.data(),
              });
            });
            setBoards(documents);
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
  };
  useEffect(() => {
    fetch_boards();
    return () => {
      setBoards(null);
    };
  }, [userId]);

  return [boards, fetch_boards];
};

export const addNewBoard = async (e, fetchBoards, userId, workspaceId) => {
  e.preventDefault();
  const board = BoardFactory(
    userId,
    workspaceId,
    e.target.elements.boardName.value
  );
  board.addBoard();
  e.target.elements.boardName.value = "";
  fetchBoards();
};

export const deleteBoard = async (id, fetchBoards) => {
  await deleteDoc(doc(db.getDB(), "boards", id));
  fetchBoards();
};

export const leaveBoard = async (boardId, userId) => {
  Board.leaveBoard(boardId, userId);
};

export const changeVisibility = async (workspaceId, boardId, visiblityType) => {
  const docRef = doc(db.getDB(), `workspaces/${workspaceId}/`, boardId);
  await updateDoc(docRef, {
    visiblitytype: visiblityType,
  });
};
