import React from "react";
import useBoards from "../../controller/BoardController";
import { db } from "../../util/firebase-config";
import BoardList from "../components/BoardList";
import { useParams } from "react-router-dom";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    addDoc,
    updateDoc,
    setDoc,
    deleteDoc,
} from "firebase/firestore";
export const Board = ({ userId, name }) => {
    let workspaceId = useParams();
    const boards = useBoards(workspaceId.workspaceId);

    const addNewBoard = async (e) => {
        e.preventDefault();

        const columnOrder = {id: 'columnOrder'}
        await addDoc(collection(db, "boards"), {
            name: e.target.elements.boardName.value,
            user: doc(db, "users", userId),
            workspace: doc(db, "workspaces", workspaceId.workspaceId),
        }).then((board) => {
            setDoc(doc(db, `boards/${board.id}/lists`, "columnOrder"),{
                columnOrder:columnOrder,
                order: []
            });
        })
            
        
        // db.collection(`users/${userId}/boards`)
        //     .doc(uid)
        //     .set({name: e.target.elements.boardName.value})
        e.target.elements.boardName.value = "";
    };

    const deleteBoard = async (id) => {
        // db.collection(`users/${userId}/boards`)
        //     .doc(id)
        //     .delete()
        await deleteDoc(doc(db, "boards", id));
    };

    return boards !== null ? (
        <BoardList
            boards={boards}
            name={name}
            addNewBoard={addNewBoard}
            deleteBoard={deleteBoard}
        ></BoardList>
    ) : (
        <div className="flex items-center justify-center h-screen">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};
