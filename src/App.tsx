import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';
import ITask from './Interfaces';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import axios from "axios";

const defaultTasks: Array<ITask> = [
  { "title": "Feed the cats", "completed": false, "id": 1 },
  { "title": "Test the software", "completed": false, "id": 2 },

];

const emptyTask: ITask = {"title": "", "completed": false, "id": 0};


function App() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [taskToEdit, setTaskToEdit] = useState(emptyTask);

  const baseURL = "http://localhost:3000/tasks";

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setTasks(response.data);
    });
  }, []);

  if (!tasks) return null;

  console.log(tasks)

  // return (
  //   <div>
  //     <h1>{post.title}</h1>
  //     <p>{post.body}</p>
  //   </div>
  // );

  function addTask(task : ITask){
    let highestId = 0;
    for(let i = 0;i< tasks.length;i++){
      let currentId = tasks[i].id ?? 0;
      if(currentId > highestId){
        highestId = currentId;
      }

    }

    task.id = highestId + 1;
    setTasks([...tasks, task]);
  };

  function deleteTask(item: ITask){
    setTasks(tasks.filter(i => i.id !== item.id));
  };

  function setEditTask(task: ITask) {
    setTaskToEdit(task);
  }

  function editTask(task: ITask) {
    // Find correct todo item to update
    setTasks(tasks.map(i => (i.id === task.id ? task : i)));
  }

  return (
    <div className="App">
      <TaskList setTaskToEdit={setEditTask} delete={deleteTask} tasks={tasks}></TaskList>
      <AddTaskForm add={addTask}></AddTaskForm>
      <EditTaskForm edit={editTask} taskToEdit={taskToEdit}></EditTaskForm>
    </div>
  );
};

export default App;
