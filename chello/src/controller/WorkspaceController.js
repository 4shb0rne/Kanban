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

const useWorkspaces = (userId) => {
  const [workspaces, setWorkspace] = useState(null);
  const fetch_workspaces = () => {
    const docRef = doc(db.getDB(), "users", userId);
    getDoc(docRef).then((docSnap) => {
      try {
        if (docSnap.exists()) {
          const data = docSnap.data();
          getDocs(
            query(
              collection(db.getDB(), "workspaces"),
              where("users", "array-contains", docSnap.ref)
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
