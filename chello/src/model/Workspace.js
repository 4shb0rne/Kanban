import {
    collection,
    doc,
    updateDoc,
    addDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../util/firebase-config";
import firebase from "firebase/compat/app";
import { async } from "@firebase/util";
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
            visibilitytype: "public",
        });
    }
    static async deleteWorkspace(workspaceID) {
        const workspaceRef = doc(db.getDB(), "workspaces", workspaceID);
        await getDocs(
            query(
                collection(db.getDB(), "boards"),
                where("workspace", "==", workspaceRef),
                where("status", "==", "open")
            )
        ).then(async (snap) => {
            snap.forEach(async (w) => {
                await updateDoc(doc(db.getDB(), "boards", w.id), {
                    status: "closed",
                });
            });
            await deleteDoc(workspaceRef);
        });
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
        await updateDoc(
            doc(db.getDB(), "workspaces", workspaceId.workspaceId),
            {
                users: firebase.firestore.FieldValue.arrayRemove(user),
            }
        );
        await updateDoc(
            doc(db.getDB(), "workspaces", workspaceId.workspaceId),
            {
                users: firebase.firestore.FieldValue.arrayRemove(admin),
            }
        );
    }
}
