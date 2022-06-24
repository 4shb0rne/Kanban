import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    deleteDoc,
    query,
    where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../util/firebase-config";

const useWorkspaces = (userId) => {
    const [workspaces, setWorkspace] = useState(null);

    useEffect(() => {
        const docRef = doc(db, "users", "mGD1nioLXrZN0JI1Px6jdgCg2623");
        getDoc(docRef).then((docSnap) => {
            try {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    getDocs(
                        query(
                            collection(db, "workspaces"),
                            where("user", "==", docSnap.ref)
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

        return () => {
            setWorkspace(null);
        };
    }, [userId]);

    return workspaces;
};

export default useWorkspaces;
