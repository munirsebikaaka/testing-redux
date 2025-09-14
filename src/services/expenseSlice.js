const initialState = { expenseArray: [] };

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "expense/newExpense":
      return {
        ...state,
        expenseArray: [
          ...state.expenseArray,
          {
            amount: +action.payload.amount,
            title: action.payload.title,
            description: action.payload.description,
            id: Math.floor(Math.random() * 1000),
          },
        ],
      };

    case "expense/deleteExpense":
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
    type: "expense/newExpense",
    payload: { amount, title, description },
  };
};
export const deleteExpense = (id) => {
  return {
    type: "expense/deleteExpense",
    payload: id,
  };
};
