import { db, auth } from "../../util/firebase-config";

import { useAuthState } from "react-firebase-hooks/auth";
import {
    useWorkspaces,
    useWorkspacesUser,
} from "../../controller/WorkspaceController";
import WorkspaceList from "../components/WorkspaceList";
import { Login } from "../userauth/login";
import {
    addWorkspace,
    deleteWorkspace,
} from "../../controller/WorkspaceController";
import { useBoardsHomeAdmin } from "../../controller/BoardController";
import HomeBoardList from "../components/HomeBoardList";
import WorkspaceListUser from "../components/WorkspaceListUser";
import { useEffect } from "react";

const Home = ({ userId, name }) => {
    const [workspaces, fetchWorkspaces] = useWorkspaces(userId);
    const [userworkspaces, fetchuserworkspaces] = useWorkspacesUser(userId);
    const [boards, fetchboards] = useBoardsHomeAdmin(userId);
    const [user] = useAuthState(auth.getAuth());
    useEffect(() => {
        fetchWorkspaces();
    }, [workspaces]);
    useEffect(() => {
        fetchuserworkspaces();
    }, [userworkspaces]);
    if (!user) {
        return <Login></Login>;
    }
    return workspaces !== null && boards !== null ? (
        <div>
            {user ? (
                <div>
                    <WorkspaceList
                        workspaces={workspaces}
                        name={name}
                        addNewWorkspace={addWorkspace}
                        deleteWorkspace={deleteWorkspace}
                        fetchWorkspaces={fetchWorkspaces}
                        userId={userId}
                    ></WorkspaceList>
                    <WorkspaceListUser
                        workspaces={userworkspaces}
                    ></WorkspaceListUser>
                </div>
            ) : (
                <>PLS LOGIN</>
            )}
            {user ? (
                <HomeBoardList boards={boards}></HomeBoardList>
            ) : (
                <>NO BOARD</>
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
