import { db } from "../util/firebase-config";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";

export const addCard = async (e, col, description, boardId, close) => {
    e.preventDefault();
    const title = e.target.elements.newTaskTitle.value;

    await addDoc(collection(db, `boards/${boardId}/cards`), {
        title,
        description,
        todos: [],
        dateAdded: serverTimestamp(),
    }).then((card) => {
        updateDoc(doc(db, `boards/${boardId}/lists`, col), {
            taskIds: firebase.firestore.FieldValue.arrayUnion(card.id),
        });
    });
    close();
    window.location.reload();
};
