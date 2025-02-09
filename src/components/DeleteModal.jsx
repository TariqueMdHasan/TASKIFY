import React from 'react';
import './DeleteModal.css'; // You can style the modal as needed

const DeleteModal = ({ onClose, onConfirm }) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <p>Confirm delete?</p>
        <div className="delete-modal-buttons">
          <button onClick={onConfirm} className="delete-confirm-button">
            Delete
          </button>
          <button onClick={onClose} className="delete-cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;