import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTask,
  allCompletedTasks,
  deleteTask,
  deleteTaskFromComplete,
  getCategories,
  updateTask,
} from "../services/tasksSlice";

import "../styles/tasks.css";

const TaskManager = () => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { taskArray, completedTasks } = useSelector((store) => store.tasks);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!task || !category) return setError("Some inputs are empty..!");
    dispatch(addNewTask(task, category));
    dispatch(getCategories(category));

    setTask("");
    setCategory("");
  };

  const onUpdateTask = (id) => {
    dispatch(updateTask(id));
    dispatch(allCompletedTasks());
  };

  const onDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const onDeleteTaskFromCompleted = (id) => {
    dispatch(deleteTaskFromComplete(id));
  };

  const groupedTasks = taskArray.reduce((groups, t) => {
    if (!groups[t.category]) {
      groups[t.category] = [];
    }
    groups[t.category].push(t);
    return groups;
  }, {});

  return (
    <div className="task-manager">
      <h1 className="title">Task Manager</h1>

      <form className="task-form" onSubmit={onSubmitHandler}>
        <p className="error">{error}</p>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task"
          className="input"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="input"
        />
        <button className="btn btn-accent">Add</button>
      </form>

      <section className="task-section">
        <h2>All Tasks</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskArray.map((t) => (
              <tr key={t.id}>
                <td>{t.task}</td>
                <td>{t.category}</td>
                <td>{t.status}</td>
                <td>
                  <button
                    onClick={() => onUpdateTask(t.id)}
                    className="btn btn-accent">
                    Mark As Completed
                  </button>
                  <button
                    onClick={() => onDeleteTask(t.id)}
                    className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="task-section">
        <h2>Completed Tasks</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks?.length > 0 &&
              completedTasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.task}</td>
                  <td>{t.category}</td>
                  <td>{t.status}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDeleteTaskFromCompleted(t.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      <section className="task-section">
        <h2>Category Filter</h2>
        {Object.entries(groupedTasks).map(([category, tasks]) => (
          <div key={category} className="task-category-block">
            <h3 className="category-title">{category}</h3>
            <table className="task-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id}>
                    <td>{t.task}</td>
                    <td>{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TaskManager;
