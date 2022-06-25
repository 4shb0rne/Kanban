import { useState, useEffect } from "react";
import { db } from "../util/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  onSnapshot,
} from "firebase/firestore";
export const useKanban = (boardId) => {
  const [tasks, setTasks] = useState(null);
  const [columns, setColumns] = useState(null);
  const [final, setFinal] = useState(null);
  const [boardName, setBoardName] = useState("");

  const fetch_cards = () => {
    const docRef = doc(db, "boards", boardId);
    getDoc(docRef).then((docSnap) => {
      try {
        if (docSnap.exists()) {
          const data = docSnap.data();
          getDocs(query(collection(db, `boards/${boardId}/cards`))).then(
            (listSnap) => {
              const documents = [];
              listSnap.forEach((b) => {
                documents.push({
                  id: b.id,
                  ...b.data(),
                });
              });
              setTasks(documents);
            }
          );
        }
      } catch (e) {
        console.log(e);
      }
    });
  };
  const fetch_board_name = () => {
    const docRef = doc(db, "boards", boardId);
    getDoc(docRef).then((d) => {
      if (d.exists()) {
        setBoardName(d.data().name);
      }
    });
  };
  useEffect(() => {
    fetch_cards();
    // return db
    //     .collection(`users/${userId}/boards/${boardId}/tasks`)
    //     .onSnapshot((snap) => {
    //         const documents = [];
    //         snap.forEach((d) => {
    //             documents.push({ id: d.id, ...d.data() });
    //         });
    //         setTasks(documents);
    //     });
    return () => {
      setTasks(null);
    };
  }, [boardId]);

  useEffect(() => {
    fetch_board_name();
    // return db
    //     .collection(`users/${userId}/boards`)
    //     .doc(boardId)
    //     .get()
    //     .then((d) => setBoardName(d.data().name));
    return () => {
      return setBoardName(null);
    };
  }, [boardId]);
  const fetch_lists = () => {
    const docRef = doc(db, "boards", boardId);
    getDoc(docRef).then((docSnap) => {
      try {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const q = query(collection(db, `boards/${boardId}/lists`));
          const documents = [];
          const snap = onSnapshot(q, (snapshots) => {
            snapshots.forEach((b) => {
              documents.push({
                id: b.id,
                ...b.data(),
              });
            });
            setColumns(documents);
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
  };
  useEffect(() => {
    fetch_lists();
    return () => {
      setColumns(null);
    };
  }, [boardId]);

  const setFinalData = () => {
    if (tasks && columns) {
      const finalObject = {};

      const co = columns.find((c) => c.id === "columnOrder");
      const cols = columns.filter((c) => c.id !== "columnOrder");
      finalObject.columnOrder = co?.order;
      finalObject.columns = {};
      finalObject.tasks = {};
      tasks.forEach((t) => (finalObject.tasks[t.id] = t));
      cols.forEach((c) => (finalObject.columns[c.id] = c));

      setFinal(finalObject);
    }
  };

  useEffect(() => {
    setFinalData();
  }, [tasks, columns]);

  const allFetch = () => {
    fetch_cards();
    fetch_board_name();
    fetch_lists();
    setFinalData();
  };
  return { initialData: final, setInitialData: setFinal, boardName, allFetch };
};
