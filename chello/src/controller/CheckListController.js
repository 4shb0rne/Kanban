import { db } from "../util/firebase-config";
import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";

export const addSubTask = async (
  e,
  boardId,
  taskId,
  allFetch,
  setList,
  todoList,
  newTaskRef
) => {
  if (e.key === "Enter" && e.target.value !== "") {
    const uid = uuidv4();
    setList([...todoList, { id: uid, task: e.target.value, done: false }]);
    const docRef = doc(db, `boards/${boardId}/cards`, taskId);
    await updateDoc(docRef, {
      todos: firebase.firestore.FieldValue.arrayUnion({
        id: uid,
        task: e.target.value,
        done: false,
      }),
    });
    newTaskRef.current.value = "";
    allFetch();
  }
};

export const checkMark = async (
  e,
  todo,
  boardId,
  taskId,
  allFetch,
  todoList
) => {
  const toBeChanged = todoList.filter((t) => t.task === todo.task)[0];
  const rest = todoList.filter((t) => t.task !== todo.task);
  toBeChanged.done = !toBeChanged.done;
  const docRef = doc(db, `boards/${boardId}/cards`, taskId);
  await updateDoc(docRef, {
    todos: [...rest, toBeChanged],
  });
  allFetch();
};

export const deleteSubTask = async (
  taskName,
  todoList,
  boardId,
  taskId,
  allFetch,
  setList
) => {
  const filtered = todoList.filter((t) => t.task !== taskName);
  setList(filtered);
  const docRef = doc(db, `boards/${boardId}/cards`, taskId);
  await updateDoc(docRef, {
    todos: filtered,
  });
  allFetch();
};
