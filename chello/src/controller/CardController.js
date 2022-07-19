import { db } from "../util/firebase-config";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";

export const addCard = async (e, col, description, boardId, close) => {
    e.preventDefault();
    const title = e.target.elements.newTaskTitle.value;

    await addDoc(collection(db.getDB(), `boards/${boardId}/cards`), {
        title,
        description,
        todos: [],
        dateAdded: serverTimestamp(),
    }).then((card) => {
        updateDoc(doc(db.getDB(), `boards/${boardId}/lists`, col), {
            taskIds: firebase.firestore.FieldValue.arrayUnion(card.id),
        });
    });
    close();
    window.location.reload();
};
export const updateCard = async (
    e,
    closeModal,
    boardId,
    taskDetails,
    updatedTitle,
    updatedDesc,
    allFetch
) => {
    e.preventDefault();
    closeModal();
    const docRef = doc(db.getDB(), `boards/${boardId}/cards`, taskDetails.id);
    await updateDoc(docRef, {
        title: updatedTitle,
        description: updatedDesc,
    });
    allFetch();
};

export const deleteCard = async (
    e,
    setModal,
    closeModal,
    boardId,
    columnDetails,
    taskDetails,
    allFetch
) => {
    setModal(false);
    closeModal();
    const docRef = doc(db.getDB(), `boards/${boardId}/lists`, columnDetails.id);
    await updateDoc(docRef, {
        taskIds: firebase.firestore.FieldValue.arrayRemove(taskDetails.id),
    });
    const docRef2 = doc(db.getDB(), `boards/${boardId}/cards`, taskDetails.id);
    await deleteDoc(docRef2);
    allFetch();
};
