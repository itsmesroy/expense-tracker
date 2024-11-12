import React, { useState } from "react";
import Modal from "react-modal";

function IncomeModal({ isOpen, onClose, addIncome }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    addIncome(parseFloat(amount));
    setAmount("");
    setError("");
    onClose();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value && !isNaN(value) && parseFloat(value) > 0) {
      setError("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName={`modal-overlay ${isOpen ? "open" : ""}`}
      style={{ width: "538px", height: "164px" }}
    >
      <h2>Add Balance</h2>
      {error && <div className="error">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="incomeForm"
        style={{ display: "flex", gap: "10px" }}
      >
        <input
          type="number"
          placeholder="Income Amount"
          value={amount}
          onChange={handleInputChange}
          aria-label="Income Amount"
          required
          style={{ width: "300px" }}
        />

        <button
          type="submit"
          className="btn add-button"
          style={{ width: "145px", backgroundColor: "#F4BB4A", color: "white" }}
        >
          Add Balance
        </button>
        <button
          type="button"
          onClick={onClose}
          className="btn cancel-button"
          style={{ width: "100px" }}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}

export default IncomeModal;
