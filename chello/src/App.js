import "./styles/main.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./views/userauth/login";
import { Register } from "./views/userauth/register";
import { Layout } from "./views/main/layout";
import Home from "./views/main/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import Kanban from "./views/main/Kanban";
import { auth } from "./util/firebase-config";
import { Board } from "./views/main/Board";

function App() {
    const [user] = useAuthState(auth);
    return (
        <Layout>
            <Routes>
                <Route
                    path="/"
                    element={
                        user ? (
                            <Home
                                userId={user.uid}
                                name={user.displayName}
                            ></Home>
                        ) : (
                            <Home userId={""} name={""}></Home>
                        )
                    }
                ></Route>
                <Route
                    path="/workspace/:workspaceId"
                    element={
                        <Board
                            userId={"mGD1nioLXrZN0JI1Px6jdgCg2623"}
                            name={"Ashborne"}
                        ></Board>
                    }
                ></Route>
                <Route
                    path="/board/:boardId"
                    element={<Kanban userId={"mGD1nioLXrZN0JI1Px6jdgCg2623"} />}
                ></Route>
                <Route path="/login" element={<Login></Login>} />
                <Route path="/register" element={<Register></Register>} />
            </Routes>
        </Layout>
    );
}

export default App;
