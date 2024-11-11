import React, { useState } from 'react';

function ExpenseForm({ addExpense, closeExpenseModal, walletBalance }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  if (parseFloat(amount) > walletBalance) {
    setError('Insufficient wallet balance.');
    return;
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !amount || !category || !date) {
      setError('Please fill out all fields.');
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    // Add the expense
    const newExpense = {
      id: Date.now(), // Unique ID based on current timestamp
      title,
      amount: parseFloat(amount),
      category,
      date,
    };

    addExpense(newExpense);
    resetForm();
    closeExpenseModal();
  };

  // Reset the form fields
  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setError('');

    
  };

  return (
    <div className="modal">
      <h2>Add Expense</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Select Category"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder='dd/mm/yyyy'
        />
        <div className="modal-buttons">
          <button type="submit" className="btn add-button">
            Add Expense
          </button>
          <button
            type="button"
            onClick={closeExpenseModal}
            className="btn cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
