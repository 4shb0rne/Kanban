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
    updateDoc,
} from "firebase/firestore";
import { BoardFactory } from "../factory/BoardFactory";
import { Board } from "../model/Board";
import firebase from "firebase/compat/app";
export const useBoardsHomeAdmin = (userId) => {
    const [boards, setBoards] = useState(null);
    const fetch_boards = () => {
        const docRef = doc(db.getDB(), "users", userId);
        getDoc(docRef).then((docSnap) => {
            try {
                if (docSnap.exists()) {
                    const userRef = {
                        userid: docSnap.ref,
                        role: "admin",
                    };
                    getDocs(
                        query(
                            collection(db.getDB(), "boards"),
                            where("users", "array-contains", userRef)
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

export const useBoards = (userId, workspaceId) => {
    const [boards, setBoards] = useState(null);
    const fetch_boards = () => {
        const docRef = doc(db.getDB(), "users", userId);
        getDoc(docRef).then((docSnap) => {
            try {
                if (docSnap.exists()) {
                    const userRef = {
                        userid: docSnap.ref,
                        role: "admin",
                    };
                    const workspace = doc(
                        db.getDB(),
                        "workspaces",
                        workspaceId.workspaceId
                    );
                    getDocs(
                        query(
                            collection(db.getDB(), "boards"),
                            where("users", "array-contains", userRef),
                            where("workspace", "==", workspace)
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

export const useBoardsUser = (userId, workspaceId) => {
    const [boards, setBoards] = useState(null);
    const fetch_boards = () => {
        const documents = [];
        const docRef = doc(db.getDB(), "users", userId);
        const workspace = doc(
            db.getDB(),
            "workspaces",
            workspaceId.workspaceId
        );
        getDoc(docRef).then((docSnap) => {
            try {
                if (docSnap.exists()) {
                    const userRef = {
                        userid: docSnap.ref,
                        role: "user",
                    };
                    getDocs(
                        query(
                            collection(db.getDB(), "boards"),
                            where("users", "array-contains", userRef),
                            where("visibilitytype", "==", "memberonly"),
                            where("workspace", "==", workspace)
                        )
                    ).then((boardSnap) => {
                        boardSnap.forEach((b) => {
                            documents.push({
                                id: b.id,
                                ...b.data(),
                            });
                        });
                    });
                }
            } catch (e) {
                console.log(e);
            }
        });
        getDoc(docRef).then((docSnap) => {
            try {
                if (docSnap.exists()) {
                    getDocs(
                        query(
                            collection(db.getDB(), "boards"),
                            where("visibilitytype", "==", "public"),
                            where("workspace", "==", workspace)
                        )
                    ).then((boardSnap) => {
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

export const leaveBoard = async (boardId, userId) => {
    Board.leaveBoard(boardId, userId);
};

export const changeVisibility = async (boardId, visiblityType) => {
    const docRef = doc(db.getDB(), `boards`, boardId.boardId);
    await updateDoc(docRef, {
        visiblitytype: visiblityType,
    });
};

export const getAdmins = async (boardId) => {
    const docRef = doc(db.getDB(), "boards", boardId.boardId);
    const documents = [];
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        for (let u of docSnap.data().users) {
            if (u.role == "admin") {
                const userSnap = await getDoc(u.userid);
                documents.push({
                    id: userSnap.id,
                    ...userSnap.data(),
                });
            }
        }
    }

    return documents;
};

export const getUsers = async (boardId) => {
    const docRef = doc(db.getDB(), "boards", boardId.boardId);
    const documents = [];
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        for (let u of docSnap.data().users) {
            if (u.role == "user") {
                const userSnap = await getDoc(u.userid);
                documents.push({
                    id: userSnap.id,
                    ...userSnap.data(),
                });
            }
        }
    }
    return documents;
};

export const grantAdmin = async (boardId, userId) => {
    const user = {
        userid: doc(db.getDB(), "users", userId),
        role: "user",
    };

    const docRef = doc(db.getDB(), "workspaces", boardId.boardId);
    await updateDoc(docRef, {
        users: firebase.firestore.FieldValue.arrayRemove(user),
    });
    const admin = {
        userid: doc(db.getDB(), "users", userId),
        role: "admin",
    };
    await updateDoc(docRef, {
        users: firebase.firestore.FieldValue.arrayUnion(admin),
    });
};

export const revokeAdmin = async (boardId, userId) => {
    const user = {
        userid: doc(db.getDB(), "users", userId),
        role: "user",
    };
    const admin = {
        userid: doc(db.getDB(), "users", userId),
        role: "admin",
    };
    const docRef = doc(db.getDB(), "workspaces", boardId.boardId);
    await updateDoc(docRef, {
        users: firebase.firestore.FieldValue.arrayRemove(admin),
    });

    await updateDoc(docRef, {
        users: firebase.firestore.FieldValue.arrayUnion(user),
    });
};

export const moveBoard = async (workspaceId, boardId) => {
    await updateDoc(doc(db.getDB(), "boards", boardId.boardId), {
        workspace: doc(db.getDB(), "workspaces", workspaceId),
    });
};

export const kickUser = async (boardId, userId) => {
    const user = {
        userid: doc(db.getDB(), "users", userId),
        role: "user",
    };
    await updateDoc(doc(db.getDB(), "boards", boardId.boardId), {
        users: firebase.firestore.FieldValue.arrayRemove(user),
    });
};
