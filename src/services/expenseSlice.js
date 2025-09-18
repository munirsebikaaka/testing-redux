const initialState = { expenseArray: [] };

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "expense/add":
      return {
        ...state,
        expenseArray: [
          ...state.expenseArray,
          {
            amount: +action.payload.amount,
            title: action.payload.title,
            description: action.payload.description,
            id: Date.now(),
          },
        ],
      };

    case "expense/delete":
      return {
        ...state,
        expenseArray: state.expenseArray.filter(
          (expense) => expense.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const newExpense = (amount, title, description) => {
  return {
    type: "expense/add",
    payload: { amount, title, description },
  };
};
export const deleteExpense = (id) => {
  return {
    type: "expense/delete",
    payload: id,
  };
};
