import React, { useEffect } from "react";
import "../../styles/main.css";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase-config";
import { Logout } from "../../controller/UserController";
import { useNavigate } from "react-router-dom";
import { NotificationDropdown } from "./NotificationDropdown";
export const Header = () => {
    const [user] = useAuthState(auth.getAuth());
    let navigate = useNavigate();
    return (
        <header>
            <nav className="bg-gray-800 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <Link to="/" className="flex items-center">
                        <span className="text-white self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            CHello
                        </span>
                    </Link>
                    <button
                        data-collapse-toggle="mobile-menu"
                        type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
                        </svg>
                        <svg
                            className="hidden w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                        </svg>
                    </button>
                    <div
                        className="hidden w-full md:block md:w-auto"
                        id="mobile-menu"
                    >
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            <li>
                                <Link
                                    to="/"
                                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white"
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                {!user && (
                                    <Link
                                        to="/login"
                                        className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:p-0 text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Login
                                    </Link>
                                )}
                            </li>
                            <li>
                                {!user && (
                                    <Link
                                        to="/register"
                                        className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:p-0 text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Register
                                    </Link>
                                )}
                            </li>
                            <li>
                                {user && (
                                    <Link
                                        to="/profile"
                                        className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:p-0 text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Edit Profile
                                    </Link>
                                )}
                            </li>
                            <li>
                                {user && (
                                    <button
                                        onClick={async () => {
                                            Logout();
                                            navigate("/");
                                        }}
                                        className="block py-2 pr-4 pl-3 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:p-0 text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    >
                                        Logout
                                    </button>
                                )}
                            </li>
                            <li>
                                {user && (
                                    <NotificationDropdown
                                        UserID={user.uid}
                                    ></NotificationDropdown>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
