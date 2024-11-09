import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import IncomeModal from "./components/IncomeModal";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import ExpenseModal from "./components/ExpenseModal";
function App() {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const[isIncomeModalOpen, setIsIncomeModalOpen]=useState(false);
  const [expenses, setExpenses] = useState([]);

  const openIncomeModal=()=>setIsIncomeModalOpen(true);
  const closeIncomeModal=()=>setIsIncomeModalOpen(false);
  const openExpenseModal=()=>setIsExpenseModalOpen(true);
  const closeExpenseModal=()=>setIsExpenseModalOpen(false);

  useEffect(() => {
    const savedBalance = localStorage.getItem('walletBalance');
    setExpenses(savedBalance)
  }, []);

  const addIncome = (amount) => {
    const newWalletBalance = walletBalance + amount;
    setWalletBalance(newWalletBalance);
    localStorage.setItem("WalletBalance", newWalletBalance);
  };
const addExpense=(expense)=>{

}

const removeExpense=(id)=>{

}


  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>

   
      <div className="top-row">
 
        <div className="card wallet-card">
          <h3>Wallet Balance</h3>
          <p>${walletBalance}</p>
          <button onClick={openIncomeModal}>Add Income</button>
        </div>

     
        <div className="card expense-card">
          <h3>Expenses</h3>
          <div className="expense-list">
            {expenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <p>{expense.title}</p>
                <p>${expense.amount}</p>
                <button onClick={() => removeExpense(expense.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button onClick={openExpenseModal}>Add Expense</button>

          
          <div className="pie-chart">
            <PieChart width={200} height={200}>
              <Pie
                data={expenses.map((expense) => ({
                  name: expense.category,
                  value: expense.amount,
                }))}
                dataKey="value"
                outerRadius={80}
                fill="#8884d8"
              >
                {expenses.map((expense, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>


      <div className="bottom-row">

        <div className="card recent-transactions">
          <h3>Recent Transactions</h3>
          <ul>
            {expenses.slice(0, 5).map((expense) => (
              <li key={expense.id}>
                {expense.title} - ${expense.amount}
              </li>
            ))}
          </ul>
        </div>


        <div className="card top-expenses">
          <h3>Top Expenses</h3>
          <ul>
            {expenses
              .sort((a, b) => b.amount - a.amount) 
              .slice(0, 5)
              .map((expense) => (
                <li key={expense.id}>
                  {expense.title} - ${expense.amount}
                </li>
              ))}
          </ul>
        </div>
      </div>


      <IncomeModal
        isOpen={isIncomeModalOpen}
        onClose={closeIncomeModal}
        addIncome={addIncome}
      />
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={closeExpenseModal}
        addExpense={addExpense}
      />
    </div>
  );
}

export default App;
