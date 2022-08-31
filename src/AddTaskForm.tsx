import { useState } from 'react';
import ITask from './Interfaces'
export interface IProps {
    add: (newItem : ITask) => void;
    
}

const initTask = { "title": "", "id": 0, "completed": false};
function AddTaskForm(props: IProps){
    const [formValue, setFormValue] = useState(initTask);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    function onFormSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        props.add(formValue);
    }

    return (

        

        <div className="addTask">

            
            <div className='container'>
                <div className='card'>
                    <div className='card-header'>
                        <h2>Add</h2>
                    </div>
                    <div className='card-body'>
                        <form className="formAdd" onSubmit={onFormSubmit}>
                            <label className='form-label'>Enter a new Task</label>
                            <input
                                className='form-control'
                                type="text"
                                placeholder="please input name"
                                name="title"
                                value={formValue.title}
                                onChange={onInputChange}
                            />
                            <button className='btn btn-success mt-3 bi bi-check-lg'> Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTaskForm;