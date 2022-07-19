import { useState, useEffect } from "react";
import { db } from "../util/firebase-config";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    deleteDoc,
    where,
} from "firebase/firestore";
import { BoardFactory } from "../factory/BoardFactory";
const useBoards = (workspaceId) => {
    const [boards, setBoards] = useState(null);
    const fetch_boards = () => {
        const docRef = doc(db.getDB(), "workspaces", workspaceId);
        getDoc(docRef).then((docSnap) => {
            try {
                if (docSnap.exists()) {
                    getDocs(
                        query(
                            collection(db.getDB(), "boards"),
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

export const useHomeBoards = (userId) => {
    const [boards, setBoards] = useState(null);
    const fetch_boards = () => {
        const docRef = doc(db.getDB(), "users", userId);
        getDoc(docRef).then((docSnap) => {
            try {
                if (docSnap.exists()) {
                    getDocs(
                        query(
                            collection(db.getDB(), "boards"),
                            where("users", "array-contains", docSnap.ref)
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
    }, [userId]);

    return [boards, fetch_boards];
};

export const addNewBoard = async (e, fetchBoards, userId, workspaceId) => {
    e.preventDefault();
    const board = BoardFactory(
        userId,
        workspaceId,
        e.target.elements.boardName.value
    );
    board.addBoard();
    e.target.elements.boardName.value = "";
    fetchBoards();
};

export const deleteBoard = async (id, fetchBoards) => {
    await deleteDoc(doc(db.getDB(), "boards", id));
    fetchBoards();
};
export default useBoards;
