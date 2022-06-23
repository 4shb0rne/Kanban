import { db } from "../../util/firebase-config";
import { BrowserRouter, Route } from "react-router-dom";
import useBoards from "../../controller/BoardController";

import BoardList from "../components/BoardList";

import Kanban from "./kanban";

import { v4 as uuidv4 } from "uuid";

const Home = ({ logOut, userId, loginWithGoogle, name, isAnon }) => {
    const boards = useBoards(userId);

    const addNewBoard = (e) => {
        // e.preventDefault()
        // const uid = uuidv4()
        // db.collection(`users/${userId}/boards`)
        //     .doc(uid)
        //     .set({name: e.target.elements.boardName.value})
        // const columnOrder = {id: 'columnOrder', order: []}
        // db.collection(`users/${userId}/boards/${uid}/columns`)
        //     .doc('columnOrder')
        //     .set(columnOrder)
        // e.target.elements.boardName.value = ''
    };

    const deleteBoard = (id) => {
        // db.collection(`users/${userId}/boards`)
        //     .doc(id)
        //     .delete()
    };
    console.log(boards);
    return boards !== null ? (
        <>
            {boards.map((b) => (
                <div>{b.title}</div>
            ))}
        </>
    ) : (
        // <BrowserRouter>
        //     <Route exact path="/">
        //         {/* {boards.map((b) => (
        //             <>{b.title}</>
        //         ))} */}
        //         <BoardList
        //             deleteBoard={deleteBoard}
        //             logOut={logOut}
        //             boards={boards}
        //             addNewBoard={addNewBoard}
        //             name={name}
        //         />
        //         {/* <BoardList boards={boards} /> */}
        //     </Route>

        //     <Route path="/board/:boardId">
        //         <Kanban userId={userId} />
        //     </Route>
        // </BrowserRouter>
        <>loading</>
    );
    // return <div className="spinner h-screen w-screen">{boards && "as"}</div>;
};

export default Home;
