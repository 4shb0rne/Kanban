import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../util/firebase-config";

export const RegisterAuth = (registerEmail, registerPassword) => {
    return createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
    );
};

export const ValidateRegister = (
    registerUsername,
    registerEmail,
    registerPassword,
) => {
    const errors = {};
    if (!registerUsername) {
        errors["username"] = "Username must be filled";
    }
    if (!registerEmail) {
        errors["email"] = "Email must be filled";
    }
    if (registerPassword.length < 6) {
        errors["password"] = "Password must be more than 6 characters";
    }
    return errors;
};

export const LoginAuth = async (loginEmail, loginPassword) => {
    return await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
};

export const Logout = async () => {
    await signOut(auth);
};
