import { db } from "../util/firebase-config";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
    deleteDoc,
    getDocs,
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

export const addComment = async (boardId, cardId, userId, userName, body) => {
    console.log(cardId);
    await addDoc(
        collection(db.getDB(), `boards/${boardId}/cards/${cardId}/comments`),
        {
            userId: userId,
            userName: userName,
            body: body,
        }
    );
};
export const deleteComment = async (boardId, cardId, commentId) => {
    await deleteDoc(
        collection(db.getDB(), `boards/${boardId}/cards/${cardId}/comments`),
        commentId
    );
};
export const viewComment = async (boardId, cardId) => {
    let documents = [];
    const querycomment = await getDocs(
        collection(db.getDB(), `boards/${boardId}/cards/${cardId}/comments`)
    );
    querycomment.forEach((doc) => {
        documents.push({
            id: doc.id,
            ...doc.data(),
        });
        console.log(doc.data());
    });
    return documents;
};
