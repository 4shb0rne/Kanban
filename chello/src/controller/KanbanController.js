import { useState, useEffect } from "react";
import { db } from "../util/firebase-config";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    onSnapshot,
    setDoc,
    updateDoc,
} from "firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { debounce } from "../util/utils";
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
                    getDocs(
                        query(collection(db, `boards/${boardId}/cards`))
                    ).then((listSnap) => {
                        const documents = [];
                        listSnap.forEach((b) => {
                            documents.push({
                                id: b.id,
                                ...b.data(),
                            });
                        });
                        setTasks(documents);
                    });
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
        return () => {
            setTasks(null);
        };
    }, [boardId]);

    useEffect(() => {
        fetch_board_name();
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
    return {
        initialData: final,
        setInitialData: setFinal,
        boardName,
        allFetch,
    };
};

export const addCol = (e, boardId, allFetch) => {
    e.preventDefault();
    const newColumnName = e.target.elements.newCol.value;
    const docRef = doc(db, `boards/${boardId}/lists`, newColumnName);
    setDoc(docRef, {
        title: newColumnName,
        taskIds: [],
    });
    const docRef2 = doc(db, `boards/${boardId}/lists`, "columnOrder");
    updateDoc(docRef2, {
        order: firebase.firestore.FieldValue.arrayUnion(newColumnName),
    });
    e.target.elements.newCol.value = "";
    allFetch();
};
