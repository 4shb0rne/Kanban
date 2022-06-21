import { useEffect, useState } from "react";
import { login, register, logout } from "./controller/AuthController";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./util/firebase-config";
import "./styles/main.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/userauth/login";
import { Register } from "./components/userauth/register";
import { Layout } from "./components/main/layout";
import { Home } from "./components/main/home";

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
