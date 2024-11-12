import React from "react";
import Modal from "react-modal";

function DeleteExpenseModal({ isOpen, onClose, onDelete, expenseId }) {
  const handleDelete = () => {
    onDelete(expenseId);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Are you sure you want to delete this expense?</h2>
      <div className="modal-buttons">
        <button onClick={handleDelete} className="btn delete-button">
          Delete
        </button>
        <button onClick={onClose} className="btn cancel-button">
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default DeleteExpenseModal;
