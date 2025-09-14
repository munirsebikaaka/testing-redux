import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTask,
  allCompletedTasks,
  deleteTask,
  deleteTaskFromComplete,
  updateTask,
} from "../services/tasksSlice";

const TaskManager = () => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [singleCategory, setSingleCategory] = useState([]);

  const dispatch = useDispatch();
  const { taskArray, completedTasks } = useSelector((store) => store.tasks);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!task || !category) return;
    dispatch(addNewTask(task, category));
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

  const getCategory = (category) => {
    const categorys = taskArray.filter((el) => el.category === category);
    setSingleCategory(categorys);
  };

  useEffect(() => {
    if (taskArray.length < 1) return;
    taskArray.forEach((task) => {
      getCategory(task.category);
    });
  }, [taskArray]);

  return (
    <div className="task-manager">
      <h1 className="title">Task Manager</h1>

      <form className="task-form" onSubmit={onSubmitHandler}>
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
        <ul className="task-list">
          {taskArray.map((t) => (
            <li key={t.id} className="task-card">
              <h3>{t.task}</h3>
              <p className="status">{t.status}</p>
              <div className="task-actions">
                <button
                  onClick={() => onUpdateTask(t.id)}
                  className="btn btn-accent">
                  Update Status
                </button>
                <button
                  onClick={() => onDeleteTask(t.id)}
                  className="btn btn-danger">
                  Delete Task
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="task-section">
        <h2>Completed Tasks</h2>
        <ul className="task-list">
          {completedTasks.map((t) => (
            <li key={t.id} className="task-card">
              <h3>{t.task}</h3>
              <p className="status">{t.status}</p>
              <button
                className="btn btn-danger"
                onClick={() => onDeleteTaskFromCompleted(t.id)}>
                Delete Task
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="task-section">
        <h2>Category Filter</h2>
        {singleCategory.map((cat, i) => (
          <div key={i} className="task-card">
            <h3>{cat.category}</h3>
            <p>{cat.task}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TaskManager;
