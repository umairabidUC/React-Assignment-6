import React, { useState, useEffect } from 'react';

const DeleteConfirmation = ({ id, onConfirm, onCancel }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      const timer = setTimeout(() => {
        onConfirm(id);
        setShowModal(false);
        setIsDeleting(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isDeleting, onConfirm, id]);

  const handleDelete = () => {
    setIsDeleting(true);
  };

  const handleClose = () => {
    onCancel();
    setShowModal(false);
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${showModal ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-lg z-50">
        {!isDeleting ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </>
        ) : (
          <h2 className="text-lg font-semibold mb-4">Deleted</h2>
        )}
      </div>
    </div>
  );
};

export default DeleteConfirmation;
