import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../util/firebase-config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export const AddUser = async (
    uid,
    registerUsername,
    registerEmail,
    registerPassword
) => {
    await setDoc(doc(db.getDB(), "users", uid), {
        useremail: registerEmail,
        username: registerUsername,
        userpassword: registerPassword,
        uid: uid,
    });
};

// export const getUsername = async (id) => {
//     const docRef = doc(db, "users", id);
//     return await getDoc(docRef);
// };

export const RegisterAuth = (registerEmail, registerPassword) => {
    return createUserWithEmailAndPassword(
        auth.getAuth(),
        registerEmail,
        registerPassword
    );
};

export const updateProfile = () => {};

export const ValidateRegister = (
    registerUsername,
    registerEmail,
    registerPassword
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
    return await signInWithEmailAndPassword(
        auth.getAuth(),
        loginEmail,
        loginPassword
    );
};

export const Logout = async () => {
    await signOut(auth.getAuth());
};
