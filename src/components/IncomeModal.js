import React, { useState } from "react";
import Modal from "react-modal";

function IncomeModal({ isOpen, onClose, addIncome }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(!amount || isNaN(amount) ||amount<=0){
        setError('Please enter a valid amount');
        return;
    }
    addIncome(parseFloat(amount));
    setAmount('');
    setError('');
    onClose();

  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <h2>Add Balance</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="incomeForm">
        <input
          type="number"
          placeholder="Income Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div>
          <button type="submit" className="btn add-button">
            Add Balance
          </button>
          <button type="button" onClick={onClose} className="btn cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
export default IncomeModal;
