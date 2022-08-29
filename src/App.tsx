import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskList from './TaskList';
import ITask from './Interfaces';
import AddTaskForm from './AddTaskForm';

const defaultTasks: Array<ITask> = [
  { "taskDescription": "Feed the cats", "completed": false, "taskId": 1 },
  { "taskDescription": "Test the software", "completed": false, "taskId": 2 },

];

function App() {
  const [tasks, setTasks] = useState(defaultTasks);

  function addTask(task : ITask){
    const id = tasks.length+1;
    task.taskId = id;
    setTasks([...tasks, task]);
  }


  return (
    <div className="App">
      <TaskList tasks={tasks}></TaskList>
      <AddTaskForm add={addTask}></AddTaskForm>
    </div>
  );
}

export default App;
