import { db, auth } from "../../util/firebase-config";

import { Logout } from "../../controller/UserController";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import useWorkspaces from "../../controller/WorkspaceController";
import WorkspaceList from "../components/WorkspaceList";
import { Login } from "../userauth/login";
const Home = ({ userId, name }) => {
  const [workspaces, fetchWorkspaces] = useWorkspaces(userId);

  const [user] = useAuthState(auth);
  const addWorkspace = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "workspaces"), {
      name: e.target.elements.workspaceName.value,
      user: doc(db, "users", userId),
    });
    e.target.elements.workspaceName.value = "";
    fetchWorkspaces();
  };

  const deleteWorkspace = async (id) => {
    await deleteDoc(doc(db, "workspaces", id));
    fetchWorkspaces();
  };
  if (!user) {
    return <Login></Login>;
  }
  return workspaces !== null ? (
    <div>
      {user ? (
        <WorkspaceList
          workspaces={workspaces}
          LogOut={Logout}
          name={name}
          addNewWorkspace={addWorkspace}
          deleteWorkspace={deleteWorkspace}
        ></WorkspaceList>
      ) : (
        <>PLS LOGIN</>
      )}
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
