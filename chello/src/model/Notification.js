export class WorkspaceNotification {
  constructor(UserID, WorkspaceID, WorkspaceName, AdminName) {
    this.UserID = UserID;
    this.WorkspaceID = WorkspaceID;
    this.Workspacename = WorkspaceName;
    this.AdminName = AdminName;
  }
}

export class BoardNotification {
  constructor(UserID, WorkspaceID, BoardID, BoardName, AdminName) {
    this.UserID = UserID;
    this.WorkspaceID = WorkspaceID;
    this.BoardID = BoardID;
    this.BoardName = BoardName;
    this.AdminName = AdminName;
  }
}
