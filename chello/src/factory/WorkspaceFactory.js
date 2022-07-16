import { Workspace } from "../model/Workspace";

export const WorkspaceFactory = (userID, workspaceName) => {
  const workspace = new Workspace(userID, workspaceName);
  return workspace;
};
