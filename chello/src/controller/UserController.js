import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../util/firebase-config";

export const AddUser = async (
    uid,
    registerUsername,
    registerEmail,
    registerPassword
) => {
    await setDoc(doc(db, "users", uid), {
        useremail: registerEmail,
        username: registerUsername,
        userpassword: registerPassword,
        uid: uid,
    });
};
