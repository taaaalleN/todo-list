import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed, 
  Completed: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || props.tasks);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
    if (newTask.name !== "") {
      if (!tasks.filter(task => task.name === newTask.name)) {
        setTasks([...tasks, newTask]);
      } else {
        alert("This task is already in the list")
      }
    } else {
      alert("You cannot add an empty task");
    }
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (id) => {
    const newTaskList = tasks.filter((task) => task.id !== id);
    setTasks(newTaskList);
  };

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  const taskList = 
  tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      removeTask={removeTask}
      editTask={editTask}
    />
  ));

  // Ritar ut varje knapp en gång? Och fungerande knapparna hamnar vertikalt???
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ));

  const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = taskList.length >= 0 ? `${taskList.length} ${taskNoun} remaining` : "You're all out of tasks!";

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      {filterList}
      <h2 id="list-heading">{headingText}</h2>
      <ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
