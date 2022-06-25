import { useState } from "react";
import { db } from "../../util/firebase-config";
import {
  addDoc,
  collection,
  doc,
  FieldValue,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const AddTask = ({ boardId, userId, close, allCols, allFetch }) => {
  const [description, setDescription] = useState(null);

  const addTask = async (e) => {
    e.preventDefault();
    const title = e.target.elements.newTaskTitle.value;
    const column = e.target.elements.column.value;

    await addDoc(collection(db, `boards/${boardId}/cards`), {
      title,
      priority: "",
      description,
      todos: [],
      dateAdded: serverTimestamp(),
    }).then((card) => {
      console.log(column);
      updateDoc(doc(db, `boards/${boardId}/lists`, column), {
        taskIds: firebase.firestore.FieldValue.arrayUnion(card.id),
      });
    });
    close();
    window.location.reload();
  };

  return (
    <div className="px-3 py-2 md:px-12  text-sm md:text-base">
      <form onSubmit={addTask} autoComplete="off">
        <h4 className="text-lg sm:text-2xl text-gray-800">Add a New Task</h4>

        <div className="mt-6 sm:mt-12">
          <div>
            <label htmlFor="newTaskTitle" className="block text-gray-500">
              Title:
            </label>
            <input
              maxLength="45"
              required
              type="text"
              name="newTaskTitle"
              className="bg-transparent border-b border-gray-400 w-3/4 text-lg md:text-2xl outline-none"
            />
          </div>
          <div className="sm:flex my-8">
            <div className="mt-8 sm:mt-0">
              <label className="text-gray-500 block sm:inline" htmlFor="column">
                Select a column:{" "}
              </label>
              <select name="column" required className="select">
                {allCols.map((c) => (
                  <option className="option" value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="my-8">
          <label htmlFor="newTaskDescription" className="block text-gray-500">
            Description (optional):
          </label>
          <textarea
            name="desc"
            className="border border-gray-300 w-full px-4 py-3 outline-none h-32"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="bg-blue-500 text-white px-2 py-1 rounded-sm">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
