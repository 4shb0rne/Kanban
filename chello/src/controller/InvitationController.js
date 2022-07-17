import { updateDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
export const AcceptInvitation = async (NotificationID, WorkspaceID, UserID) => {
  const ref = doc(db, "workspaces", WorkspaceID);
  await updateDoc(ref, {
    users: firebase.firestore.FieldValue.arrayUnion(UserID),
  });
  await deleteDoc(doc(db, `users/${UserID}/notifications`, NotificationID));
};

export const DeclineInvitation = async (NotificationID) => {
  await deleteDoc(doc(db, `users/${UserID}/notifications`, NotificationID));
};
