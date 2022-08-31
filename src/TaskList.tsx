import ITask from './Interfaces'
export interface IProps {
    tasks: ITask[];
    delete: (item : ITask) => void;
    setTaskToEdit: (item : ITask) => void;
}
function TaskList(props: IProps) {

    function editTask(task: ITask) {
        props.setTaskToEdit(task);
    }

    return (
        <div className="list container">
            <table className="table table-striped table-hover table-bordered mt-5">
                <thead className='table-dark'>
                    <tr>
                        <td>ID</td>
                        <td>Titel</td>
                        <td>Completed</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {props.tasks.map(task => {
                        return (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.completed}</td>
                                <td>
                                    <button className="btn btn-success bi bi-pencil" onClick={() => props.setTaskToEdit(task)}> Edit</button>
                                </td>

                                <td>
                                    <button className="btn btn-danger bi bi-trash3" onClick={() => props.delete(task)}> Delete</button>    
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;
