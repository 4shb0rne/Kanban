import { useEffect, useState } from "react";
import { DeleteCardLabel, getCardLabel } from "../../controller/CardController";

const ManageCardLabel = (boardId) => {
    const [labelColors, setlabelColors] = useState([]);
    const [color, setColor] = useState("#000000");
    useEffect(() => {
        fetch_labels();
    }, []);
    const fetch_labels = async () => {
        const labels = await getCardLabel(boardId.boardId);
        setlabelColors(labels);
    };
    return (
        <div>
            <p className="text-3xl mb-3">Manage Card Label</p>
            <div>
                <label
                    htmlFor="color-input"
                    className="block mb-2 mt-5 text-sm font-medium"
                >
                    Label Name
                </label>
                <div className="relative">
                    <select id="labelname">
                        {labelColors.map((label) => {
                            return (
                                <option value={label.id}>
                                    {label.labelName}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div>
                <label
                    htmlFor="text-input"
                    className="block mb-2 mt-5 text-sm font-medium"
                >
                    Label Color
                </label>
                <div className="relative">
                    <input id="text-input" type="color" defaultValue={color} />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-2 py-1 rounded-sm mt-3"
                >
                    Update Label
                </button>
                <button
                    type="submit"
                    className="bg-red-500 text-white px-2 py-1 rounded-sm mt-3 ml-3"
                    onClick={() => {
                        const label =
                            document.getElementById("labelname").value;
                        DeleteCardLabel(boardId.boardId, label);
                        fetch_labels();
                    }}
                >
                    Delete Label
                </button>
            </div>
        </div>
    );
};

export default ManageCardLabel;
