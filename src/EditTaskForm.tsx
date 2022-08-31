import React, {useEffect, useState} from 'react';
import ITask from './Interfaces'

export interface IProps {
    edit: (editTask: ITask) => void;
    taskToEdit: ITask;
}

const initTask = {"title": "", "id": 0, "completed": false};

function EditTaskForm(props: IProps) {
    const [formValue, setFormValue] = useState(props.taskToEdit ?? initTask);
    useEffect(() => setFormValue(props.taskToEdit), [props]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    };

    function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.edit(formValue);
    }

    return (
        <div className="editTask">
            <div className="container mt-3 mb-3">
                <div className="card">
                    <div className="card-header">
                        <h2>Edit Task {props.taskToEdit?.id}</h2>
                    </div>
                    <div className="card-body">
                        <label className='form-label'>Edit the task</label>
                        <form className="formEdit" onSubmit={onFormSubmit}>
                            <input
                                type="text"
                                placeholder="Please enter a Task"
                                name="title"
                                value={formValue.title}
                                className="form__field form-control"
                                onChange={onInputChange}
                                required
                            />
                            <button className="btn btn-success mt-3 bi bi-check-lg"> Edit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTaskForm;