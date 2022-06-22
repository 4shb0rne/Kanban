
import "./styles/main.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./views/userauth/login";
import { Register } from "./views/userauth/register";
import { Layout } from "./views/main/layout";
import { Home } from "./views/main/home";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>} />
                <Route path="/register" element={<Register></Register>} />
            </Routes>
        </Layout>
    );
}

export default App;
