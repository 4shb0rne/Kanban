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
const Home = ({ userId, name }) => {
    const workspaces = useWorkspaces(userId);
    const [user] = useAuthState(auth);
    const addWorkspace = async (e) => {
        e.preventDefault();
        const docRef = addDoc(collection(db, "workspaces"), {
            name: e.target.elements.workspaceName.value,
            user: doc(db, "users", userId),
        });
        // db.collection(`users/${userId}/boards`)
        //     .doc(uid)
        //     .set({name: e.target.elements.boardName.value})
        e.target.elements.workspaceName.value = "";
    };

    const deleteWorkspace = async (id) => {
        // db.collection(`users/${userId}/boards`)
        //     .doc(id)
        //     .delete()
        await deleteDoc(doc(db, "workspaces", id));
    };

    return workspaces !== null ? (
        <div>
            {user ? (
                <WorkspaceList
                    workspaces={workspaces}
                    logOut={Logout}
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

        // return <div className="spinner h-screen w-screen">{boards && "as"}</div>;
    );
};

export default Home;
