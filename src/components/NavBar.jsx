// src/components/Navbar.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMode, setSelectedRows, updateStatus } from '../features/topicSlice';
import axiosInstance from '../api/axiosInstance';
import Modal from './Modal';

const Navbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.topics.mode);
  const selectedRows = useSelector((state) => state.topics.selectedRows);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModeToggle = () => {
    dispatch(toggleMode());
  };

  const handleHide = async () => {
    console.log('Hide button clicked');
    const hidePromises = selectedRows.map(async (row) => {
      try {
        await axiosInstance.patch('/topics/status', { id: row.id, status: false });
        dispatch(updateStatus({ id: row.id, status: false }));
      } catch (error) {
        console.error('Error updating status:', error);
      }
    });

    await Promise.all(hidePromises);
    dispatch(setSelectedRows([])); // Clear selected rows after hiding
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="text-lg">Welcome</div>
      <div className="flex items-center">
        <label className="switch">
          <input type="checkbox" checked={mode === 'show'} onChange={handleModeToggle} />
          <span className="slider"></span>
        </label>
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Topic
        </button>
        <button
          className={`ml-4 px-4 py-2 bg-blue-500 text-white rounded ${mode === 'hide' ? '' : 'hidden'}`}
          onClick={handleHide}
        >
          Hide
        </button>
        <button
          className={`ml-4 px-4 py-2 bg-green-500 text-white rounded ${mode === 'show' ? '' : 'hidden'}`}
          onClick={handleModeToggle}
        >
          Show
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
