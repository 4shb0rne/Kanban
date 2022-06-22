import { collection, addDoc } from 'firebase/firestore'
import { db } from "../util/firebase-config";

export const AddUser = async (registerUsername, registerEmail, registerPassword) => {
    await addDoc(collection(db, "users"), {
        useremail: registerEmail,
        username: registerUsername,
        userpassword: registerPassword
    });
}
