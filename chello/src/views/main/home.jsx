import { db, auth } from "../../util/firebase-config";

import { useAuthState } from "react-firebase-hooks/auth";
import useWorkspaces from "../../controller/WorkspaceController";
import WorkspaceList from "../components/WorkspaceList";
import { Login } from "../userauth/login";
import {
  addWorkspace,
  deleteWorkspace,
} from "../../controller/WorkspaceController";
import useBoards from "../../controller/BoardController";
import HomeBoardList from "../components/HomeBoardList";
const Home = ({ userId, name }) => {
  const [workspaces, fetchWorkspaces] = useWorkspaces(userId);
  const [boards, fetchboards] = useBoards(userId);
  const [user] = useAuthState(auth.getAuth());

  if (!user) {
    return <Login></Login>;
  }
  return workspaces !== null && boards !== null ? (
    <div>
      {user ? (
        <WorkspaceList
          workspaces={workspaces}
          name={name}
          addNewWorkspace={addWorkspace}
          deleteWorkspace={deleteWorkspace}
          fetchWorkspaces={fetchWorkspaces}
          userId={userId}
        ></WorkspaceList>
      ) : (
        <>PLS LOGIN</>
      )}
      {user ? <HomeBoardList boards={boards}></HomeBoardList> : <>NO BOARD</>}
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
