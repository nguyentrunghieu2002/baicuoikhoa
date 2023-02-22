import React from "react";
import { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [filter, setFilter] = useState("all");
  function addTask() {
    if (currentTask.trim() !== "") {
      setTasks([...tasks, { name: currentTask, done: false }]);
      setCurrentTask("");
    }
  }

  function deleteTask(index) {
    setTasks(tasks.filter((task, i) => i !== index));
  }

  function toggleTaskDone(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  }

  function clearCompletedTasks() {
    setTasks(tasks.filter((task) => !task.done));
  }

  function getFilteredTasks() {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.done);
      case "completed":
        return tasks.filter((task) => task.done);
      default:
        return tasks;
    }
  }

  return (
    <div>
      <div>
        <h1>Todo List</h1>
        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
        <div>
          <input
            value={currentTask}
            onChange={(event) => setCurrentTask(event.target.value)}
          />
          <button onClick={addTask}>Add task</button>
        </div>
        <ul>
          {getFilteredTasks().map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTaskDone(index)}
              />
              <span>{task.name}</span>
              <button onClick={() => deleteTask(index)}>X</button>
            </li>
          ))}
        </ul>
        <button onClick={clearCompletedTasks}>Clear completed tasks</button>
      </div>
    </div>
  );
};

export default TodoList;
