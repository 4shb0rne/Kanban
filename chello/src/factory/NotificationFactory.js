import { Notification } from "../model/Notification";

export const NotificationFactory = (
  UserID,
  WorkspaceID,
  WorkspaceName,
  AdminName
) => {
  const notification = new Notification(
    UserID,
    WorkspaceID,
    WorkspaceName,
    AdminName
  );
  return notification;
};
