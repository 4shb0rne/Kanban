import {
  collection,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../util/firebase-config";
import firebase from "firebase/compat/app";
export class Workspace {
  constructor(userID, workspaceName) {
    this.userID = userID;
    this.workspaceName = workspaceName;
  }
  async addWorkspace() {
    await addDoc(collection(db.getDB(), "workspaces"), {
      name: this.workspaceName,
      users: firebase.firestore.FieldValue.arrayUnion(
        doc(db, "users", this.userID)
      ),
    });
  }
  static async deleteWorkspace(workspaceID) {
    await deleteDoc(doc(db.getDB(), "workspaces", workspaceID));
  }
  static async leaveWorkspace(workspaceId, userId) {
    const userRef = doc(db.getDB(), "users", userId);
    await updateDoc(doc(db.getDB(), "workspaces", workspaceId.workspaceId), {
      users: firebase.firestore.FieldValue.arrayRemove(userRef),
    });
  }
}
