const initialState = {
  taskArray: [],
  completedTasks: [],
  pendingTasks: [],
};

export const taskRducer = (state = initialState, action) => {
  switch (action.type) {
    case "task/addNewTask":
      return {
        ...state,
        taskArray: [
          ...state.taskArray,
          {
            task: action.payload.task,
            category: action.payload.category,
            status: "pending",
            id: Math.floor(Math.random() * 100),
          },
        ],
      };

    case "task/finished":
      return {
        ...state,
        taskArray: state.taskArray.map((task) =>
          task.id === action.payload ? { ...task, status: "finished" } : task
        ),
      };

    case "task/completedTask":
      return {
        ...state,
        completedTasks: state.taskArray.filter(
          (task) => task.status !== "pending"
        ),
      };

    case "task/deleteTask":
      return {
        ...state,
        taskArray: state.taskArray.filter((task) => task.id !== action.payload),
      };
    case "task/deleteTaskFromComplete":
      return {
        ...state,
        completedTasks: state.taskArray.filter(
          (task) => task.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const addNewTask = (task, category) => {
  return { type: "task/addNewTask", payload: { task, category } };
};

export const updateTask = (id) => {
  return { type: "task/finished", payload: id };
};
export const deleteTask = (id) => {
  return { type: "task/deleteTask", payload: id };
};
export const deleteTaskFromComplete = (id) => {
  return { type: "task/deleteTaskFromComplete", payload: id };
};
export const allCompletedTasks = () => {
  return { type: "task/completedTask" };
};
