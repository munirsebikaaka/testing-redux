import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, newExpense } from "../services/expenseSlice";
import { useGetConvertedQuery } from "../services/convertAmountSlice";

const ExpenseTracker = () => {
  const [amount, setAmount] = useState("");
  const [des, setDes] = useState("");
  const [title, setTitle] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [isConverted, setConvert] = useState(false);

  const dispatch = useDispatch();
  const { expenseArray } = useSelector((store) => store.expenses);
  const { data, error, isLoading } = useGetConvertedQuery();

  const eurRate = data?.rates?.EUR;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!amount || !title) return;
    dispatch(newExpense(amount, title, des));
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

  console.log(convertedAmount);

  const displayArray = isSorted
    ? [...expenseArray].sort((a, b) => b.amount - a.amount)
    : expenseArray;

  return (
    <div className="tracker-manager">
      <h1 className="tracker-title">Expense Tracker</h1>

      <form onSubmit={onSubmitHandler} className="expense-form">
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
        <ul>
          {displayArray.map((expense) => (
            <li key={expense.id} className="expense-item">
              <div>
                <h2 className="expense-title">{expense.title}</h2>
                <p className="expense-description">{expense.description}</p>
                <p className="expense-amount">${expense.amount}</p>
              </div>
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="btn btn-danger">
                Delete
              </button>
            </li>
          ))}
        </ul>

        {expenseArray.length > 0 && (
          <>
            <p className="total-expenses">
              Total Expenses:
              {isConverted
                ? `EURO ${convertedAmount}`
                : `$ ${calulateTotalExpenses()}`}
            </p>
            <button onClick={toggleSort} className="btn btn-accent">
              {isSorted ? "Show Original" : "Sort by Highest"}
            </button>
            <button onClick={toggleConvert} className="btn btn-accent">
              {isConverted ? "Convert USD" : "Convert EURO"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
