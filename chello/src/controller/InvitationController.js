import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { db } from "../util/firebase-config";
import { getAllUsers } from "./WorkspaceController";
import { createNotificationUser } from "./NotificationController";

export const AcceptInvitationWorkspace = async (
    NotificationID,
    WorkspaceID,
    UserID,
    WorkspaceName
) => {
    const ref = doc(db.getDB(), "workspaces", WorkspaceID);
    await updateDoc(ref, {
        users: firebase.firestore.FieldValue.arrayUnion({
            userid: doc(db.getDB(), "users", UserID),
            role: "user",
        }),
    });
    await deleteDoc(
        doc(db.getDB(), `users/${UserID}/notifications`, NotificationID)
    );
    const users = await getAllUsers(WorkspaceID);
    for (let user of users) {
        createNotificationUser(user.uid, user.username, WorkspaceName);
    }
};

export const AcceptInvitationBoard = async (
    NotificationID,
    WorkspaceID,
    BoardID,
    UserID
) => {
    const ref = doc(db.getDB(), `workspaces/${WorkspaceID}`, BoardID);
    await updateDoc(ref, {
        users: firebase.firestore.FieldValue.arrayUnion({
            userid: doc(db.getDB(), "users", UserID),
            role: "user",
        }),
    });
    await deleteDoc(
        doc(db.getDB(), `users/${UserID}/notifications`, NotificationID)
    );
};

export const DeclineInvitation = async (NotificationID, UserID) => {
    await deleteDoc(
        doc(db.getDB(), `users/${UserID}/notifications`, NotificationID)
    );
};
