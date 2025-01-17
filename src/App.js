import React, { useState, useEffect } from "react";
import "./App.css";
import IncomeModal from "./components/IncomeModal";
import ExpenseModal from "./components/ExpenseModal.js";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseTrends from "./components/ExpenseTrends";
import DeleteExpenseModal from "./components/DeleteExpenseModal";

import { useSnackbar } from "notistack";

function App() {

  const { enqueueSnackbar } = useSnackbar();
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isDeleteExpenseModalOpen, setIsDeleteExpenseModalOpen] =useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [expenses.length]);

  const openIncomeModal = () => setIsIncomeModalOpen(true);
  const closeIncomeModal = () => setIsIncomeModalOpen(false);

  const openExpenseModal = () => setIsExpenseModalOpen(true);
  const closeExpenseModal = () => setIsExpenseModalOpen(false);

  const openEditExpenseModal = (expense) => {
    setExpenseToEdit(expense);
    setIsExpenseModalOpen(true);
  };

  const closeEditExpenseModal = () => setIsExpenseModalOpen(false);

  const openDeleteExpenseModal = (expenseId) => {
    setExpenseToDelete(expenseId);
    setIsDeleteExpenseModalOpen(true);
  };

  const closeDeleteExpenseModal = () => setIsDeleteExpenseModalOpen(false);

  const addIncome = (amount) => {
    const newWalletBalance = walletBalance + amount;
    setWalletBalance(newWalletBalance);
    localStorage.setItem("walletBalance", newWalletBalance);
  };

  const addExpense = (expense) => {
    const expenseAmount = parseFloat(expense.amount);

    if (expenseAmount > walletBalance) {
      enqueueSnackbar("Insufficient wallet balance to add this expense.", {
        variant: "error",
      });
      return;
    }
  
    const newExpense = { ...expense, id: new Date().getTime() };
    const newExpenses = [...expenses, newExpense];
    setExpenses(newExpenses);
    setWalletBalance(walletBalance - expenseAmount);
  
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
    localStorage.setItem("walletBalance", walletBalance - expenseAmount);
  };

  const editExpense = (updatedExpense) => {
    
  const originalExpense = expenses.find(
    (expense) => expense.id === updatedExpense.id
  );
  const originalAmount = parseFloat(originalExpense.amount);
  const updatedAmount = parseFloat(updatedExpense.amount);

  const balanceAdjustment = updatedAmount - originalAmount;

  if (balanceAdjustment > walletBalance) {
    enqueueSnackbar("Insufficient wallet balance to update this expense.", {
      variant: "error",
    });
    return;
  }

  const updatedExpenses = expenses.map((expense) =>
    expense.id === updatedExpense.id ? updatedExpense : expense
  );

  setExpenses(updatedExpenses);
  setWalletBalance(walletBalance - balanceAdjustment);

  localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  localStorage.setItem("walletBalance", walletBalance - balanceAdjustment);
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
        <h1>Expense Tracker</h1>
      <div className="Container">

        <div className="row align-items-center ">
          <div className="col-sm">
            <div className="wallet-balance">
              <h2>
                Wallet Balance: ₹ {walletBalance}
              </h2>
              <button
                className="button"
                type="button"
                style={{
                  background:
                    "linear-gradient(90deg, #B5DC52 0%, #89E148 100%)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={openIncomeModal} >
                + Add Income
              </button>

            </div>
          </div>

          <div className="col-sm">
            <div className="add-expense">              
            <h2 style={{ display: "flex" }}>
                  <div >Expenses:</div>₹
                  {expenses.reduce(
                    (total, expense) => total + expense.amount,
                    0
                  )}
                </h2>
                <button
                  onClick={openExpenseModal}
                  style={{
                    background:
                      "linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  + Add Expense
                </button>    
            </div>
          </div>
          <div className="col-sm">
        <ExpenseSummary expenses={expenses} />
          </div>
        </div>

        <div className="lower-section">         
            <div
              className="recent-transactions"            
            >
              <h2 style={{ fontStyle: "italic" }}>Recent Transactions</h2>
              <ExpenseList
                expenses={expenses}
                onEdit={openEditExpenseModal}
                onDelete={(id) => openDeleteExpenseModal(id)}
              />
            </div>

            <div
              className="expense-trends"
              style={{ width: "40%", height: "345px" }}
            >
              <div className="recent-transactions">
              <h2 style={{ fontStyle: "italic" }}>Top Expenses</h2>
                <ExpenseTrends
                  expenses={expenses}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
       
        </div>

      </div>
      <IncomeModal
      isOpen={isIncomeModalOpen}
      onClose={closeIncomeModal}
      addIncome={addIncome}/>
      
      <ExpenseModal
      isOpen={isExpenseModalOpen}
      onClose={closeEditExpenseModal}
      addExpense={addExpense}
      editExpense={editExpense}
      expenseToEdit={expenseToEdit}
      walletBalance={walletBalance}
      enqueueSnackbar={enqueueSnackbar}/>

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
