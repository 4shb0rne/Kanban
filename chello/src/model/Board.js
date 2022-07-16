import { collection, doc, setDoc, addDoc, deleteDoc } from "firebase/firestore";
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
    await addDoc(collection(db, "boards"), {
      name: this.boardName,
      users: firebase.firestore.FieldValue.arrayUnion(
        doc(db, "users", this.userID)
      ),
      workspace: doc(db, "workspaces", this.workspaceID.workspaceId),
    }).then((board) => {
      setDoc(doc(db, `boards/${board.id}/lists`, "columnOrder"), {
        columnOrder: columnOrder,
        order: [],
      });
    });
  }
  static async deleteBoard(boardID) {
    await deleteDoc(doc(db, "boards", boardID));
  }
}
