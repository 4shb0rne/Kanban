import { NotificationFactory } from "../factory/NotificationFactory";
import { db } from "../util/firebase-config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const createNotification = async (
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
    const notification = NotificationFactory(
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
