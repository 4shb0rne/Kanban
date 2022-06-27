import { useState, useEffect } from "react";
import { db } from "../util/firebase-config";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    addDoc,
    setDoc,
    deleteDoc,
    where,
} from "firebase/firestore";
const useBoards = (workspaceId) => {
    const [boards, setBoards] = useState(null);
    const fetch_boards = () => {
        const docRef = doc(db, "workspaces", workspaceId);
        getDoc(docRef).then((docSnap) => {
            try {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    getDocs(
                        query(
                            collection(db, "boards"),
                            where("workspace", "==", docSnap.ref)
                        )
                    ).then((boardSnap) => {
                        const documents = [];
                        boardSnap.forEach((b) => {
                            documents.push({
                                id: b.id,
                                ...b.data(),
                            });
                        });
                        setBoards(documents);
                    });
                }
            } catch (e) {
                console.log(e);
            }
        });
    };
    useEffect(() => {
        fetch_boards();
        return () => {
            setBoards(null);
        };
    }, [workspaceId]);

    return [boards, fetch_boards];
};

export const addNewBoard = async (e, fetchBoards, userId, workspaceId) => {
    e.preventDefault();

    const columnOrder = { id: "columnOrder" };
    await addDoc(collection(db, "boards"), {
        name: e.target.elements.boardName.value,
        user: doc(db, "users", userId),
        workspace: doc(db, "workspaces", workspaceId.workspaceId),
    }).then((board) => {
        setDoc(doc(db, `boards/${board.id}/lists`, "columnOrder"), {
            columnOrder: columnOrder,
            order: [],
        });
    });
    e.target.elements.boardName.value = "";
    fetchBoards();
};

export const deleteBoard = async (id, fetchBoards) => {
    await deleteDoc(doc(db, "boards", id));
    fetchBoards();
};
export default useBoards;
