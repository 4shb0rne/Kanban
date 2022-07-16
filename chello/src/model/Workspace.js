import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
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
    await addDoc(collection(db, "workspaces"), {
      name: this.workspaceName,
      users: firebase.firestore.FieldValue.arrayUnion(
        doc(db, "users", this.userID)
      ),
    });
  }
  static async deleteWorkspace(workspaceID) {
    await deleteDoc(doc(db, "workspaces", workspaceID));
  }
}
