import { AddCardLabel } from "../../controller/CardController";

const CardLabel = (boardId) => {
    return (
        <form
            autoComplete="off"
            onSubmit={() => {
                const labelcolor = document.getElementById("color-input").value;
                const labelname = document.getElementById("text-input").value;
                AddCardLabel(boardId, labelcolor, labelname);
            }}
        >
            <p className="text-3xl mb-3">Add Card Label</p>
            <div>
                <label
                    htmlFor="color-input"
                    className="block mb-2 text-sm font-medium"
                >
                    Label Color
                </label>
                <div className="relative">
                    <input id="color-input" type="color" />
                </div>
            </div>
            <div>
                <label
                    htmlFor="text-input"
                    className="block mb-2 text-sm font-medium"
                >
                    Label Name
                </label>
                <div className="relative">
                    <input
                        id="text-input"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <input
                    type="submit"
                    className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
                    value="Add Label"
                />
            </div>
        </form>
    );
};

export default CardLabel;
