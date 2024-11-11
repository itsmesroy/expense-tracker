import React, { useState, useEffect } from "react";
import "./App.css";
import IncomeModal from "./components/IncomeModal";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseTrends from "./components/ExpenseTrends";
import EditExpenseModal from "./components/EditExpenseModal";
import DeleteExpenseModal from "./components/DeleteExpenseModal";

function App() {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isDeleteExpenseModalOpen, setIsDeleteExpenseModalOpen] =
    useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null); // To track expense to delete

  useEffect(() => {
    const savedBalance = localStorage.getItem("walletBalance");
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    if (savedBalance) {
      const parsedBalance = parseFloat(savedBalance);
      if (!isNaN(parsedBalance)) {
        setWalletBalance(parsedBalance);
      }
    }

    if (savedExpenses.length !== expenses.length) {
      setExpenses(savedExpenses);
    }
  }, [expenses.length]);

  // Modal Toggling functions
  const openIncomeModal = () => setIsIncomeModalOpen(true);
  const closeIncomeModal = () => setIsIncomeModalOpen(false);

  const openExpenseModal = () => setIsExpenseModalOpen(true);
  const closeExpenseModal = () => setIsExpenseModalOpen(false);

  const openEditExpenseModal = (expense) => {
    setExpenseToEdit(expense);
    setIsExpenseModalOpen(true);
  };

  const closeEditExpenseModal = () => setIsExpenseModalOpen(false);

  const openDeleteExpenseModal = (expense) => {
    setExpenseToDelete(expense);
    setIsDeleteExpenseModalOpen(true);
  };

  const closeDeleteExpenseModal = () => setIsDeleteExpenseModalOpen(false);

  const addIncome = (amount) => {
    const newWalletBalance = walletBalance + amount;
    setWalletBalance(newWalletBalance);
    localStorage.setItem("walletBalance", newWalletBalance);
  };

  const addExpense = (expense) => {
    const newExpense = { ...expense, id: new Date().getTime() };
    const newExpenses = [...expenses, newExpense];
    setExpenses(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  };

  const editExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const removeExpense = (expenseId) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    closeDeleteExpenseModal();
  };

  return (
    <div className="App">
      <h1 className="app-title">Expense Tracker</h1>
      <div className="container">
        <div className="inner-box">
          <div className="top-row">
            <div
              style={{
                display: "flex",
                gap: "10px",
                margin: "15px",
                width: "760px",
                height: "181px",
              }}
            >
              <div className="wallet-balance" style={{ width: "50%" }}>
                <h2>Wallet Balance: ₹{walletBalance}</h2>
                <button onClick={openIncomeModal}>+ Add Income</button>
              </div>

              <div className="add-expense" style={{ width: "50%" }}>
                <h2>
                  Expenses: ₹
                  {expenses.reduce(
                    (total, expense) => total + expense.amount,
                    0
                  )}
                </h2>
                <button onClick={openExpenseModal}>+ Add Expense</button>
              </div>
            </div>

            <ExpenseSummary expenses={expenses} />
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              margin: "5px",
              width: "100%",
              height: "345px",
            }}
          >
            <div
              className="recent-transactions"
              style={{ width: "60%", paddingRight: "10px" }}
            >
              <h2 style={{ fontStyle: "italic" }}>Recent Transactions</h2>
              <ExpenseList
                expenses={expenses}
                onEdit={openEditExpenseModal}
                onDelete={openDeleteExpenseModal}
              />
            </div>

            <div className="expense-trends" style={{ width: "40%" }}></div>
            <div className="recent-transactions">
              <ExpenseTrends expenses={expenses} />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <IncomeModal
        isOpen={isIncomeModalOpen}
        onClose={closeIncomeModal}
        addIncome={addIncome}
      />
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={closeEditExpenseModal}
        addExpense={addExpense}
        editExpense={editExpense}
        expenseToEdit={expenseToEdit}
      />
      <DeleteExpenseModal
        isOpen={isDeleteExpenseModalOpen}
        onClose={closeDeleteExpenseModal}
        onDelete={removeExpense}
        expenseId={expenseToDelete}
      />
    </div>
  );
}

export default App;
