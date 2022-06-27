import { useState } from "react";
import { addCard } from "../../controller/CardController";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const AddCard = ({ boardId, userId, close, col, allFetch }) => {
    const [description, setDescription] = useState(null);

    return (
        <div className="px-3 py-2 md:px-12  text-sm md:text-base">
            <form
                onSubmit={(e) => addCard(e, col, description, boardId, close)}
                autoComplete="off"
            >
                <h4 className="text-lg sm:text-2xl text-gray-800">
                    Add a Card
                </h4>

                <div className="mt-6 sm:mt-12">
                    <div>
                        <label
                            htmlFor="newTaskTitle"
                            className="block text-gray-500"
                        >
                            Title:
                        </label>
                        <input
                            maxLength="45"
                            required
                            type="text"
                            name="newTaskTitle"
                            className="bg-transparent border-b border-gray-400 w-3/4 text-lg md:text-2xl outline-none"
                        />
                    </div>
                    <div className="sm:flex my-8">
                        <div className="mt-8 sm:mt-0">
                            <label
                                className="text-gray-500 block sm:inline"
                                htmlFor="column"
                            >
                                Selected List : {""}
                            </label>
                            <label>{col}</label>
                        </div>
                    </div>
                </div>
                <div className="my-8">
                    <label
                        htmlFor="newTaskDescription"
                        className="block text-gray-500"
                    >
                        Description (optional):
                    </label>
                    <textarea
                        name="desc"
                        className="border border-gray-300 w-full px-4 py-3 outline-none h-32"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button className="bg-blue-500 text-white px-2 py-1 rounded-sm">
                    Add Card
                </button>
            </form>
        </div>
    );
};

export default AddCard;
