import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../util/firebase-config";

export const checkAuth = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);
};

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
    registerDOB
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
    const isValidDate = (registerDOB) =>
        new Date(registerDOB).toString() !== "Invalid Date";
    if (!isValidDate(registerDOB)) {
        errors["dob"] = "DOB must be filled";
    }
    return errors;
};

export const LoginAuth = async (loginEmail, loginPassword) => {
    return await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
};

export const logout = async () => {
    await signOut(auth);
};
