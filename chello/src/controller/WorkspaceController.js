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
import { db } from "../util/firebase-config";

export const addWorkspace = async (e, userId, fetchWorkspaces) => {
  e.preventDefault();
  const docRef = await addDoc(collection(db, "workspaces"), {
    name: e.target.elements.workspaceName.value,
    user: doc(db, "users", userId),
  });
  e.target.elements.workspaceName.value = "";
  fetchWorkspaces();
};

export const deleteWorkspace = async (id, fetchWorkspaces) => {
  await deleteDoc(doc(db, "workspaces", id));
  fetchWorkspaces();
};

const useWorkspaces = (userId) => {
  const [workspaces, setWorkspace] = useState(null);
  const fetch_workspaces = () => {
    const docRef = doc(db, "users", userId);
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
  };
  useEffect(() => {
    fetch_workspaces();
    return () => {
      setWorkspace(null);
    };
  }, [userId]);

  return [workspaces, fetch_workspaces];
};

export default useWorkspaces;
