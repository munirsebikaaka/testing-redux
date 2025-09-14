import { configureStore } from "@reduxjs/toolkit";
import { taskRducer } from "./services/tasksSlice";
import { expenseReducer } from "./services/expenseSlice";
import { convertAmoutApi } from "./services/convertAmountSlice";

export const store = configureStore({
  reducer: {
    tasks: taskRducer,
    expenses: expenseReducer,

    [convertAmoutApi.reducerPath]: convertAmoutApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(convertAmoutApi.middleware),
});
