import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../App.css"
function ExpenseModal({
  isOpen,
  onClose,
  addExpense,
  editExpense,
  expenseToEdit,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Health",
    "Utilities",
    "Others",
  ];

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount.toString());
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title ||
      !amount ||
      !category ||
      !date ||
      isNaN(amount) ||
      amount <= 0
    ) {
      setError("Please fill in with valid data.");
      return;
    }

    const expense = {
      id: expenseToEdit ? expenseToEdit.id : Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date,
    };

    if (expenseToEdit) {
      editExpense(expense);
    } else {
      addExpense(expense);
    }
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
    setError("");
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
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="expenseForm" >
        <div className="input-group" style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Expense Title"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-label="Expense Amount"
            required
          />
        </div>
<div style={{ display: 'flex', gap: '10px' }}>

        <select
          value={category}
          placeholder="Select Category"
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Expense Category"
          required
          >
          {categories.map((cat) => (
              <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="Expense Date"
          required
          />

          </div>
        <div className="modal-buttons" style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn add-button"  style={{width: '250px'}}>
            {expenseToEdit ? "Update Expense" : "Add Expense"}
          </button>
          <button type="button" onClick={onClose} className="btn cancel-button" style={{width: '100px'}}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ExpenseModal;
