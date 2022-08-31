import React, {useState} from 'react';
import './App.css';
import TaskList from './TaskList';
import ITask from './Interfaces';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import axios from "axios";
import Login from "./Login";

const defaultTasks: Array<ITask> = [
    {"title": "Feed the cats", "completed": false, "id": 1},
    {"title": "Test the software", "completed": false, "id": 2},

];

const emptyTask: ITask = {"title": "", "completed": false, "id": 0};


function App() {
    const [tasks, setTasks] = useState(defaultTasks);
    const [taskToEdit, setTaskToEdit] = useState(emptyTask);
    const [token, setToken] = useState("");

    function updateToken(token: string) {
        setToken(token);
    }

    const baseURL = "http://localhost:3000/auth/jwt";
    const postURL = "http://localhost:3000/auth/jwt/tasks";

    React.useEffect(() => {
        if (token !== "") {
            axios.get(baseURL + "/tasks", {headers: {'Authorization': `Bearer ${token}`}}).then((response) => {
                setTasks(response.data);
            });
        }
    }, [token]);

    if (!tasks) return null;

    console.log(tasks)

    // return (
    //   <div>
    //     <h1>{post.title}</h1>
    //     <p>{post.body}</p>
    //   </div>
    // );

    function addTask(task: ITask) {
        let highestId = 0;
        for (let i = 0; i < tasks.length; i++) {
            let currentId = tasks[i].id ?? 0;
            if (currentId > highestId) {
                highestId = currentId;
            }

        }

        task.id = highestId + 1;


        axios.post(baseURL + "/tasks", task, {headers: {'Authorization': `Bearer ${token}`}})
            .then((response) => {
                console.log(response);
                setTasks([...tasks, response.data]);
            });


    };

    function deleteTask(item: ITask) {
        // setTasks(tasks.filter(i => i.id !== item.id));
        let tasksWithoutDeleted = tasks.filter(currentTask => item.id !== currentTask.id);
        axios.delete(baseURL + "/task/" + item.id, {headers: {'Authorization': `Bearer ${token}`}}).then(() => {
            setTasks(tasksWithoutDeleted)
        });
        setTasks(tasksWithoutDeleted);
    };

    function setEditTask(task: ITask) {
        setTaskToEdit(task);
    }

    function editTask(task: ITask) {
        // Find correct todo item to update

        setTasks(tasks.map(i => (i.id === task.id ? task : i)));
        axios.put(baseURL + "/tasks", task, {headers: {'Authorization': `Bearer ${token}`}}).then((response) => {
        });
        // setTasks(tasks.map(i => (i.id === task.id ? task : i)));
        console.log("saved")
    }


    if (token === "") {
        return <Login setLoginToken={updateToken} email={""} password={""}></Login>
    } else {
        return (
            <div className="App">
                <div>
                    <TaskList editTask={editTask} setTaskToEdit={setEditTask} delete={deleteTask} tasks={tasks}></TaskList>
                    <AddTaskForm add={addTask}></AddTaskForm>
                    <EditTaskForm edit={editTask} taskToEdit={taskToEdit}></EditTaskForm>
                </div>
            </div>
        );
    }
};

export default App;
