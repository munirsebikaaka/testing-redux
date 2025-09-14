import ExpenseTracker from "./components/expenseTracker";
import TaskManager from "./components/taskManager";

function App() {
  return (
    <div>
      <h1>codesmann's</h1>

      <div className="body">
        <TaskManager />
        <ExpenseTracker />
      </div>
    </div>
  );
}

export default App;
