import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    addDoc,
    deleteDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { WorkspaceFactory } from "../factory/WorkspaceFactory";
import { Workspace } from "../model/Workspace";
import { db } from "../util/firebase-config";

export const addWorkspace = async (e, userId, fetchWorkspaces) => {
    e.preventDefault();
    const workspace = WorkspaceFactory(
        userId,
        e.target.elements.workspaceName.value
    );
    workspace.addWorkspace();
    e.target.elements.workspaceName.value = "";
    fetchWorkspaces();
};

export const deleteWorkspace = async (id, fetchWorkspaces) => {
    Workspace.deleteWorkspace(id);
    fetchWorkspaces();
};

export const leaveWorkspace = async (workspaceId, userId) => {
    Workspace.leaveWorkspace(workspaceId, userId);
};

export const useWorkspaces = (userId) => {
    const [workspaces, setWorkspace] = useState(null);
    const fetch_workspaces = () => {
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
                            collection(db.getDB(), "workspaces"),
                            where("users", "array-contains", userRef)
                        )
                    ).then((workspaceSnap) => {
                        const documents = [];
                        workspaceSnap.forEach((b) => {
                            documents.push({
                                id: b.id,
                                ...b.data(),
                            });
                        });
                        setWorkspace(documents);
                    });
                }
            } catch (e) {
                console.log(e);
            }
        });
    };
    useEffect(() => {
        fetch_workspaces();
        return () => {
            setWorkspace(null);
        };
    }, [userId]);
    return [workspaces, fetch_workspaces];
};

export const useWorkspacesUser = (userId) => {
    const [workspaces, setWorkspace] = useState(null);
    const fetch_workspaces = () => {
        const documents = [];
        const docRef = doc(db.getDB(), "users", userId);
        getDoc(docRef).then((docSnap) => {
            try {
                if (docSnap.exists()) {
                    const userRef = {
                        userid: docSnap.ref,
                        role: "user",
                    };
                    getDocs(
                        query(
                            collection(db.getDB(), "workspaces"),
                            where("users", "array-contains", userRef)
                        )
                    ).then((workspaceSnap) => {
                        workspaceSnap.forEach((b) => {
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
                    const userRef = {
                        userid: docSnap.ref,
                        role: "user",
                    };
                    getDocs(
                        query(
                            collection(db.getDB(), "workspaces"),
                            where("visibilitytype", "==", "public")
                        )
                    ).then((workspaceSnap) => {
                        workspaceSnap.forEach((b) => {
                            documents.push({
                                id: b.id,
                                ...b.data(),
                            });
                        });
                        setWorkspace(documents);
                    });
                }
            } catch (e) {
                console.log(e);
            }
        });
    };
    useEffect(() => {
        fetch_workspaces();
        return () => {
            setWorkspace(null);
        };
    }, [userId]);
    return [workspaces, fetch_workspaces];
};

export const getAdmins = (workspaceId) => {
    const docRef = doc(db.getDB(), "workspaces", workspaceId);
    const documents = [];
    getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
            docSnap.data().users.forEach((u) => {
                if (u.role == "admin") {
                    getDoc(u.userid).then((userSnap) => {
                        documents.push({
                            id: userSnap.id,
                            ...userSnap.data(),
                        });
                    });
                }
            });
        }
    });
    return documents;
};

export const getUsers = async (workspaceId) => {
    const docRef = doc(db.getDB(), "workspaces", workspaceId);
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

export const grantAdmin = (workspaceId, userId) => {};

export const revokeAdmin = (workspaceId, userId) => {};
