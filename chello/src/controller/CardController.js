import { db } from "../util/firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  getDocs,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";

export const addCard = async (e, col, description, boardId, close) => {
  e.preventDefault();
  const title = e.target.elements.newTaskTitle.value;

  await addDoc(collection(db.getDB(), `boards/${boardId}/cards`), {
    title,
    description: description,
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
    doc(db.getDB(), `boards/${boardId}/cards/${cardId}/comments`, commentId)
  );
};
export const getComments = async (boardId, cardId) => {
  let documents = [];
  const querycomment = await getDocs(
    collection(db.getDB(), `boards/${boardId}/cards/${cardId}/comments`)
  );
  querycomment.forEach((doc) => {
    documents.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return documents;
};

export const AddCardLabel = async (boardId, labelColor, labelName) => {
  await addDoc(collection(db.getDB(), `boards/${boardId.boardId}/cardlabels`), {
    labelColor: labelColor,
    labelName: labelName,
  });
};

export const AttachCardLabel = async (
  boardId,
  cardId,
  labelName,
  labelColor
) => {
  await updateDoc(doc(db.getDB(), `boards/${boardId}/cards/${cardId}`), {
    labelName: labelName,
    labelColor: labelColor,
  });
};

export const UpdateCardLabel = async (
  boardId,
  labelId,
  labelColor,
  labelName
) => {
  await updateDoc(
    doc(db.getDB(), `boards/${boardId.boardId}/cardlabels/${labelId}`),
    {
      labelColor: labelColor,
      labelName: labelName,
    }
  );
};

export const getCardLabel = async (boardId) => {
  let documents = [];
  const query = await getDocs(
    collection(db.getDB(), `boards/${boardId}/cardlabels`)
  );
  query.forEach((doc) => {
    documents.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return documents;
};
export const DeleteCardLabel = async (boardId, labelId) => {
  await deleteDoc(doc(db.getDB(), `boards/${boardId}/cardlabels`, labelId));
};

export const setCardDueDate = async (boardId, cardId, date) => {
  const card = await getDoc(doc(db.getDB(), `boards/${boardId}/cards`, cardId));
  console.log(card.data());
  await updateDoc(doc(db.getDB(), `boards/${boardId}/cards/${cardId}`), {
    DueDate: Timestamp.fromDate(date),
  });
  await addDoc(collection(db.getDB(), `boards/${boardId}/events`), {
    title: card.data().title,
    allDay: true,
    start: Timestamp.fromDate(date),
    end: Timestamp.fromDate(date),
  }).then(async (docRef) => {
    await updateDoc(doc(db.getDB(), `boards/${boardId}/events`, docRef.id), {
      id: docRef.id,
    });
  });
};
export const setCardReminderDate = async (boardId, cardId, date) => {
  await updateDoc(doc(db.getDB(), `boards/${boardId}/cards/${cardId}`), {
    ReminderDate: Timestamp.fromDate(date),
  });
};

export const getEvents = async (boardId) => {
  let documents = [];
  const query = await getDocs(
    collection(db.getDB(), `boards/${boardId.boardId}/events`)
  );
  query.forEach((doc) => {
    const data = doc.data();
    documents.push({
      id: data.id,
      allDay: data.allDay,
      end: convertToDate(data.end),
      start: convertToDate(data.start),
      title: data.title,
    });
  });

  return documents;
};

export const convertToDate = (date) => {
  var year = date.toDate().getFullYear();
  var month = date.toDate().getMonth() + 1;
  var day = date.toDate().getDate();
  return (
    year +
    "-" +
    (month < 10 ? "0" + month.toString() : month) +
    "-" +
    (day < 10 ? "0" + day.toString() : day)
  );
};

export const setCardStatus = async (boardId, cardId, status) => {
  await updateDoc(doc(db.getDB(), `boards/${boardId}/cards/${cardId}`), {
    Status: status,
  });
};
