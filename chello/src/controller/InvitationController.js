import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { db } from "../util/firebase-config";

export const AcceptInvitation = async (NotificationID, WorkspaceID, UserID) => {
    console.log("Test");
    console.log(WorkspaceID);
    const ref = doc(db, "workspaces", WorkspaceID);
    await updateDoc(ref, {
        users: firebase.firestore.FieldValue.arrayUnion(
            doc(db, "users", UserID)
        ),
    });
    await deleteDoc(doc(db, `users/${UserID}/notifications`, NotificationID));
};

export const DeclineInvitation = async (NotificationID, UserID) => {
    await deleteDoc(doc(db, `users/${UserID}/notifications`, NotificationID));
};
