const initialState = {
  taskArray: [],
};

export const taskRducer = (state = initialState, action) => {
  switch (action.type) {
    case "task/add":
      return {
        ...state,
        taskArray: [
          ...state.taskArray,
          {
            task: action.payload.task,
            category: action.payload.category,
            status: "pending",
            id: Date.now(),
          },
        ],
      };

    case "task/undateTask":
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

    case "task/delete":
      return {
        ...state,
        taskArray: state.taskArray.filter((task) => task.id !== action.payload),
      };
    case "task/clearFromCompleted":
      return {
        ...state,
        completedTasks: state.completedTasks.filter(
          (task) => task.id !== action.payload
        ),
      };

    case "task/categories":
      return {
        ...state,
        categories: state.taskArray.filter(
          (task) => task.category === action.payload
        ),
      };

    default:
      return state;
  }
};

export const addNewTask = (task, category) => {
  return { type: "task/add", payload: { task, category } };
};

export const updateTask = (id) => {
  return { type: "task/undateTask", payload: id };
};
export const deleteTask = (id) => {
  return { type: "task/delete", payload: id };
};
export const deleteTaskFromComplete = (id) => {
  return { type: "task/clearFromCompleted", payload: id };
};
export const allCompletedTasks = () => {
  return { type: "task/completedTask" };
};
export const getCategories = (amount) => {
  return { type: "task/categories", payload: amount };
};
