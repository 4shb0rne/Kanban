import {
  collection,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../util/firebase-config";
import firebase from "firebase/compat/app";
export class Workspace {
  constructor(userID, workspaceName) {
    this.userID = userID;
    this.workspaceName = workspaceName;
  }
  async addWorkspace() {
    const user = {
      userid: doc(db.getDB(), "users", this.userID),
      role: "admin",
    };
    await addDoc(collection(db.getDB(), "workspaces"), {
      name: this.workspaceName,
      users: firebase.firestore.FieldValue.arrayUnion(user),
    });
  }
  static async deleteWorkspace(workspaceID) {
    await deleteDoc(doc(db.getDB(), "workspaces", workspaceID));
  }
  static async leaveWorkspace(workspaceId, userId) {
    const admin = {
      userid: doc(db.getDB(), "users", userId),
      role: "admin",
    };
    const user = {
      userid: doc(db.getDB(), "users", userId),
      role: "user",
    };
    await updateDoc(doc(db.getDB(), "workspaces", workspaceId.workspaceId), {
      users: firebase.firestore.FieldValue.arrayRemove(user),
    });
    await updateDoc(doc(db.getDB(), "workspaces", workspaceId.workspaceId), {
      users: firebase.firestore.FieldValue.arrayRemove(admin),
    });
  }
}
