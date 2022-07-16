import "./styles/main.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./views/userauth/login";
import { Register } from "./views/userauth/register";
import { Profile } from "./views/userauth/profile";
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
              <Home userId={user.uid} name={user.displayName}></Home>
            ) : (
              <Home userId={"empty"} name={"empty"}></Home>
            )
          }
        ></Route>
        <Route
          path="/workspace/:workspaceId"
          element={
            user ? (
              <Board userId={user.uid} name={user.displayName}></Board>
            ) : (
              <Board userId="" name=""></Board>
            )
          }
        ></Route>
        <Route
          path="/board/:boardId"
          element={
            user ? (
              <Kanban userId={user.uid}></Kanban>
            ) : (
              <Kanban userId="empty"></Kanban>
            )
          }
        ></Route>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/profile" element={<Profile></Profile>} />
      </Routes>
    </Layout>
  );
}

export default App;
