import React from "react";
import ExpenseItem from "./ExpenseItem"; // Assuming you have ExpenseItem to render each expense

function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <div className="expense-list">
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={() => onEdit(expense)}  // Pass the expense to the edit handler
            onDelete={() => onDelete(expense.id)}  // Pass the expense to the delete handler
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;
