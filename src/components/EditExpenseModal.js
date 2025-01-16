import React, { useState, useEffect } from "react";
import Modal from "react-modal";

function EditExpenseModal({ isOpen, onClose, expenseToEdit, editExpense }) {

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
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setError("Enter a valid amount.");
      return;
    }

    const updatedExpense = {
      ...expenseToEdit,
      title,
      amount: parseFloat(amount),
      category,
      date,
    };

    editExpense(updatedExpense);
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
    setError("");
    onClose();
  };

  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Edit Expenses</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="expenseForm">
        <div className="input-group">
          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Expense Title"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-label="Expense Amount"
            required
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Expense Category"
          required
        >
          {categories.map((idx) => (
            <option key={idx} value={idx}>
              {idx}
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

        <div className="modal-buttons">
          <button type="submit" className="btn add-button">
            Update Expense
          </button>
          <button type="button" onClick={onClose} className="btn cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditExpenseModal;
