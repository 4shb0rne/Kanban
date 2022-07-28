import {
  WorkspaceNotificationFactory,
  BoardNotificationFactory,
} from "../factory/NotificationFactory";
import { db } from "../util/firebase-config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const createNotificationWorkspace = async (
  e,
  UserID,
  WorkspaceID,
  WorkspaceName,
  AdminName,
  email
) => {
  e.preventDefault();
  let userid;
  const queryuser = await getDocs(
    query(collection(db.getDB(), "users"), where("useremail", "==", email))
  );
  queryuser.forEach((doc) => {
    userid = doc.data().uid;
  });
  const notification = WorkspaceNotificationFactory(
    userid,
    UserID.WorkspaceID,
    UserID.WorkspaceName,
    UserID.AdminName
  );
  await addDoc(
    collection(db.getDB(), `users/${notification.UserID}/notifications/`),
    {
      WorkspaceID: notification.WorkspaceID,
      WorkspaceName: notification.Workspacename,
      Sender: notification.AdminName,
      Type: "Workspace",
    }
  );
  window.location.reload();
};

export const createNotificationBoard = async (
  e,
  UserID,
  WorkspaceID,
  BoardID,
  BoardName,
  AdminName,
  email
) => {
  e.preventDefault();
  let userid;
  const queryuser = await getDocs(
    query(collection(db.getDB(), "users"), where("useremail", "==", email))
  );
  queryuser.forEach((doc) => {
    userid = doc.data().uid;
  });
  const notification = BoardNotificationFactory(
    userid,
    UserID.WorkspaceID,
    UserID.BoardID,
    UserID.BoardName,
    UserID.AdminName
  );
  console.log(notification);
  await addDoc(
    collection(db.getDB(), `users/${notification.UserID}/notifications/`),
    {
      WorkspaceID: notification.WorkspaceID.workspaceId,
      BoardID: notification.BoardID,
      BoardName: notification.BoardName,
      Sender: notification.AdminName,
      Type: "Board",
    }
  );
  window.location.reload();
};

export const GetNotification = async (UserID) => {
  let documents = [];
  const querynotification = await getDocs(
    collection(db.getDB(), `users/${UserID}/notifications`)
  );
  querynotification.forEach((doc) => {
    documents.push({
      id: doc.id,
      ...doc.data(),
    });
    console.log(doc.data());
  });
  return documents;
};
