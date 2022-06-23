import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../util/firebase-config";

const useBoards = (userId) => {
    const [boards, setBoards] = useState(null);

    useEffect(() => {
        const docRef = doc(db, "users", "mGD1nioLXrZN0JI1Px6jdgCg2623");
        getDoc(docRef).then((docSnap) => {
            try {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    getDocs(
                        query(
                            collection(db, "boards"),
                            where("user", "==", docSnap.ref)
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

        return () => {
            setBoards(null);
        };
    }, [userId]);

    return boards;
};

export default useBoards;
