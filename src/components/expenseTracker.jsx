import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, newExpense } from "../services/expenseSlice";
import { useGetConvertedQuery } from "../services/convertAmountSlice";
import "../styles/expense.css";

const ExpenseTracker = () => {
  const [amount, setAmount] = useState("");
  const [des, setDes] = useState("");
  const [title, setTitle] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [isConverted, setConvert] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { expenseArray } = useSelector((store) => store.expenses);
  const { data } = useGetConvertedQuery();

  const eurRate = data?.rates?.EUR;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!amount || !title) return setError("Some inputs are empty..!");
    dispatch(newExpense(Number(amount), title, des));
    setAmount("");
    setDes("");
    setTitle("");
  };

  const onDeleteExpense = (id) => {
    dispatch(deleteExpense(id));
  };

  const toggleSort = () => {
    setIsSorted((prev) => !prev);
  };

  const toggleConvert = () => {
    setConvert((prev) => !prev);
  };

  const calulateTotalExpenses = () => {
    if (expenseArray.length < 1) return 0;
    return expenseArray.reduce((cur, expense) => cur + expense.amount, 0);
  };

  const convertedAmount =
    eurRate && calulateTotalExpenses() > 0
      ? (calulateTotalExpenses() * eurRate).toFixed(2)
      : calulateTotalExpenses();

  const displayArray = isSorted
    ? [...expenseArray].sort((a, b) => b.amount - a.amount)
    : expenseArray;

  return (
    <div className="tracker-manager">
      <h1 className="tracker-title">Expense Tracker</h1>

      {/* Form */}
      <form onSubmit={onSubmitHandler} className="expense-form">
        <p className="expense-error">{error}</p>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Description"
          value={des}
          onChange={(e) => setDes(e.target.value)}
          className="form-input"
        />

        <button className="btn btn-accent">Submit</button>
      </form>

      <div className="expense-list">
        {displayArray.length > 0 && (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Amount (USD)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayArray.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.title}</td>
                  <td>{expense.description}</td>
                  <td>${expense.amount}</td>
                  <td>
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {expenseArray.length > 0 && (
          <div className="expense-controls">
            <p className="total-expenses">
              Total Expenses:{" "}
              {isConverted
                ? `EURO ${convertedAmount}`
                : `$ ${calulateTotalExpenses()}`}
            </p>
            <div className="expense-buttons">
              <button onClick={toggleSort} className="btn btn-accent">
                {isSorted ? "Show Original" : "Sort by Highest"}
              </button>
              <button onClick={toggleConvert} className="btn btn-accent">
                {isConverted ? "Convert USD" : "Convert EURO"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
