import ExpenseTracker from "./components/expenseTracker";
import TaskManager from "./components/taskManager";
import "./index.css";

function App() {
  return (
    <div className="app">
      <h1 className="app-title">codesmann's Dashboard</h1>

      <div className="app-body">
        <TaskManager />
        <ExpenseTracker />
      </div>
    </div>
  );
}

export default App;
