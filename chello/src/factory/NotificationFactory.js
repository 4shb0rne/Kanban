import {
  WorkspaceNotification,
  BoardNotification,
} from "../model/Notification";

export const WorkspaceNotificationFactory = (
  UserID,
  WorkspaceID,
  WorkspaceName,
  AdminName
) => {
  const notification = new WorkspaceNotification(
    UserID,
    WorkspaceID,
    WorkspaceName,
    AdminName
  );
  return notification;
};

export const BoardNotificationFactory = (
  UserID,
  WorkspaceID,
  BoardID,
  BoardName,
  AdminName
) => {
  const notification = new BoardNotification(
    UserID,
    WorkspaceID,
    BoardID,
    BoardName,
    AdminName
  );
  return notification;
};
