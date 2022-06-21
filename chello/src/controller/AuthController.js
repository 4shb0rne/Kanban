import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../util/firebase-config";

export const RegisterAuth = async (registerEmail, registerPassword) => {
    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
        );
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
};

export const LoginAuth = async (loginEmail, loginPassword) => {
    try {
        const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        );
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
};

export const logout = async () => {
    await signOut(auth);
};
