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
        const user = {
            userid: doc(db.getDB(), "users", this.userID),
            role: "admin",
        };
        const columnOrder = { id: "columnOrder" };
        await addDoc(collection(db.getDB(), "boards"), {
            name: this.boardName,
            users: firebase.firestore.FieldValue.arrayUnion(user),
            workspace: doc(
                db.getDB(),
                "workspaces",
                this.workspaceID.workspaceId
            ),
            visibilitytype: "public",
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
        const admin = {
            userid: doc(db.getDB(), "users", userId),
            role: "admin",
        };
        const user = {
            userid: doc(db.getDB(), "users", userId),
            role: "user",
        };
        await updateDoc(doc(db.getDB(), "boards", boardId), {
            users: firebase.firestore.FieldValue.arrayRemove(user),
        });
        await updateDoc(doc(db.getDB(), "boards", boardId), {
            users: firebase.firestore.FieldValue.arrayRemove(admin),
        });
    }
}
