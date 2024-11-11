import React from "react";

function ExpenseItem({ expense, onEdit, onDelete }) {
  const { title, amount, category, date } = expense;

  return (
    <div className="expense-item">
      <div className="expense-details">
        <p><strong>{title}</strong></p>
        <p><strong>₹</strong>{amount.toFixed(2)}</p> 
        <div>
          <p><strong>{new Date(date).toLocaleDateString()}</strong></p>
        </div>       
      </div>
      <div className="expense-actions">
        <button onClick={() => onEdit(expense)} className="btn edit-button">Edit</button>
        <button onClick={() => onDelete(expense)} className="btn delete-button">Delete</button>
      </div>
    </div>
  );
}

export default ExpenseItem;
