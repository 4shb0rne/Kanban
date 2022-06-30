import ProgressBar from "@ramonak/react-progress-bar";
const ChecklistProgress = ({ todos }) => {
    const tasksCompleted = todos.filter((todo) => todo.done === true);

    return (
        <div className="flex sm:text-sm items-center justify-between text-xs">
            <div className="bg-blue-100 flex rounded-3xl px-1 sm:px-1.5 py-0.5 text-blue-900 mr-4">
                <h4 className="tracking-wider">{`${tasksCompleted.length}/${todos.length}`}</h4>
            </div>
            <ProgressBar
                completed={(tasksCompleted.length / todos.length) * 100}
                maxCompleted={100}
                width="250px"
                labelSize="50%"
            ></ProgressBar>
        </div>
    );
};

export default ChecklistProgress;
