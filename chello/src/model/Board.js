import {
  collection,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../util/firebase-config";
import firebase from "firebase/compat/app";
export class Board {
  constructor(userID, workspaceID, boardName) {
    this.userID = userID;
    this.workspaceID = workspaceID;
    this.boardName = boardName;
  }
  async addBoard() {
    const columnOrder = { id: "columnOrder" };
    await addDoc(collection(db.getDB(), "boards"), {
      name: this.boardName,
      users: firebase.firestore.FieldValue.arrayUnion(
        doc(db.getDB(), "users", this.userID)
      ),
      workspace: doc(db.getDB(), "workspaces", this.workspaceID.workspaceId),
    }).then((board) => {
      setDoc(doc(db.getDB(), `boards/${board.id}/lists`, "columnOrder"), {
        columnOrder: columnOrder,
        order: [],
      });
    });
  }
  static async deleteBoard(boardID) {
    await deleteDoc(doc(db.getDB(), "boards", boardID));
  }
  static async leaveBoard(boardId, userId) {
    const userRef = doc(db.getDB(), "users", userId);
    await updateDoc(doc(db.getDB(), "boards", boardId), {
      users: firebase.firestore.FieldValue.arrayRemove(userRef),
    });
  }
}
