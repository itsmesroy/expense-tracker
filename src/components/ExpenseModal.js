import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../App.css";
import ExpenseForm from "./ExpenseForm";

function ExpenseModal({
  isOpen,
  onClose,
  addExpense,
  editExpense,
  expenseToEdit,
  walletBalance,    
  enqueueSnackbar    
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount.toString());
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
    }
  }, [expenseToEdit]);

  const handleSubmit = (expense) => {
    if (expenseToEdit) {
      editExpense(expense);
    } else {
      addExpense(expense);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName={`modal-overlay ${isOpen ? "open" : ""}`}
    >
      <h2>{expenseToEdit ? "Edit Expense" : "Add Expense"}</h2>

      <ExpenseForm
        addExpense={handleSubmit}
        closeExpenseModal={onClose}
        walletBalance={walletBalance}        
        enqueueSnackbar={enqueueSnackbar}     
        expenseToEdit={expenseToEdit}        
      />
    </Modal>
  );
}

export default ExpenseModal;
