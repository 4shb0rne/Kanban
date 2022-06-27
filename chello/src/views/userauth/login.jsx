import React, { useEffect } from "react";
import { LoginAuth } from "../../controller/UserController";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export const Login = () => {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs flex mt-20">
        <form className="bg-white shadow-md rounded p-10">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={async () => {
                let email = document.getElementById("email").value;
                let password = document.getElementById("password").value;
                try {
                  const login = await LoginAuth(email, password);
                  console.log(login.user.displayName);
                  navigate("/");
                } catch (e) {
                  console.log(e.message);
                  setErrorMessage("Your email or password is not valid");
                }
              }}
            >
              Sign In
            </button>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-6">
            Not registered?{" "}
            <Link
              to="/register"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
          <div className="text-red-500 text-xs italic mt-5">{errorMessage}</div>
        </form>
      </div>
    </div>
  );
};
