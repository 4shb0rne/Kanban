import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    addDoc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { WorkspaceFactory } from "../factory/WorkspaceFactory";
import { Workspace } from "../model/Workspace";
import { db } from "../util/firebase-config";
import firebase from "firebase/compat/app";
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

export const getAdmins = async (workspaceId) => {
    const docRef = doc(db.getDB(), "workspaces", workspaceId.WorkspaceID);
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
    console.log(documents);
    return documents;
};

export const getUsers = async (workspaceId) => {
    const docRef = doc(db.getDB(), "workspaces", workspaceId.WorkspaceID);
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

export const grantAdmin = async (workspaceId, userId) => {
    const user = {
        userid: doc(db.getDB(), "users", userId),
        role: "user",
    };

    const docRef = doc(db.getDB(), "workspaces", workspaceId.WorkspaceID);
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

export const revokeAdmin = async (workspaceId, userId) => {
    const user = {
        userid: doc(db.getDB(), "users", userId),
        role: "user",
    };
    const admin = {
        userid: doc(db.getDB(), "users", userId),
        role: "admin",
    };
    const docRef = doc(db.getDB(), "workspaces", workspaceId);
    await updateDoc(docRef, {
        users: firebase.firestore.FieldValue.arrayRemove(admin),
    });

    await updateDoc(docRef, {
        users: firebase.firestore.FieldValue.arrayUnion(user),
    });
};
