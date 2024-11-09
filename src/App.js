import React from 'react'
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
    const savedBalance = localStorage.getItem("walletBalance");
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || []; 
    setWalletBalance(savedBalance || 5000); 
    setExpenses(savedExpenses); 
  }, [])

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
    <h1>Expense Tracker </h1>
  );
}

export default App;
