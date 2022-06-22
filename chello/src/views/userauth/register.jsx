import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    RegisterAuth,
    ValidateRegister,
} from "../../controller/AuthController";

import { AddUser } from '../../controller/UserController'
export const Register = () => {
    let navigate = useNavigate();
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    return (
        <div className="w-full max-w-xs flex mt-20">
            <div className="bg-white shadow-md rounded p-10 mb-4">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                        ${errorUsername && "border border-red-500"}`}
                        id="username"
                        type="text"
                        placeholder="Username"
                    />
                    <div className="text-red-600">
                        {errorUsername && errorUsername}
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline${
                            errorEmail && "border border-red-500"
                        }`}
                        id="email"
                        type="text"
                        placeholder="Email"
                    />
                    <div className="text-red-600">
                        {errorEmail && errorEmail}
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                            errorPassword && "border border-red-500"
                        }`}
                        id="password"
                        type="password"
                        placeholder="******************"
                    />
                    <div className="text-red-600">
                        {errorPassword && errorPassword}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={async () => {
                            let username =
                                document.getElementById("username").value;
                            let email = document.getElementById("email").value;
                            let password =
                                document.getElementById("password").value;
                            let messages = ValidateRegister(
                                username,
                                email,
                                password,
                            );
                            setErrorUsername(messages["username"]);
                            setErrorEmail(messages["email"]);
                            setErrorPassword(messages["password"]);
                            if (Object.keys(messages).length == 0) {
                                try {
                                    await RegisterAuth(email, password);
                                    AddUser(username, email, password);
                                    navigate("/login");
                                } catch (e) {
                                    console.log(e.message);
                                }
                            }
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};
