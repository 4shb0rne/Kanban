import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { db } from "../util/firebase-config";

export const AcceptInvitation = async (NotificationID, WorkspaceID, UserID) => {
  const ref = doc(db.getDB(), "workspaces", WorkspaceID);
  await updateDoc(ref, {
    users: firebase.firestore.FieldValue.arrayUnion(
      doc(db.getDB(), "users", UserID)
    ),
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
