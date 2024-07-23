// src/components/Navbar.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleView, toggleStatus, clearSelectedRows } from '../features/viewSlice';
import Modal from './Modal';
import { useChangeStatusMutation } from '../features/api/apiSlice';




const Navbar = () => {
  const dispatch = useDispatch();
  const viewGlobal = useSelector((state) => state.view.mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
  let selectedRows = useSelector((state) => state.view.selectedRows);


  const [changeStatus] = useChangeStatusMutation()
  const handleHide = () => {
    selectedRows.map((row) => {
      toggleStatus(row?.Id)
      changeStatus({ id: row.Id, status: !row.Status })
    })
    dispatch(clearSelectedRows())
  };

  const handleShow = () => {
    selectedRows.map((row) => {
      toggleStatus(row?.Id)
      changeStatus({ id: row.Id, status: !row.Status })
    })
    dispatch(clearSelectedRows())

  }

  const handleViewChange = (e) => {
    setIsChecked(!isChecked)
    dispatch(toggleView())
    dispatch(clearSelectedRows())
  }

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="text-lg">Welcome</div>
      <div className="flex items-center">
        <label htmlFor="Toggle3" className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-100">
          <input id="Toggle3" type="checkbox" className="hidden peer" value={isChecked} onChange={handleViewChange} />
          <span className="px-4 py-2 rounded-l-md dark:bg-violet-600 peer-checked:dark:bg-gray-700">Show</span>
          <span className="px-4 py-2 rounded-r-md dark:bg-gray-700 peer-checked:dark:bg-violet-600">Hide</span>
        </label>
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Topic
        </button>
        {
          viewGlobal == "show" ?

            <button
              className={`ml-4 px-4 py-2 bg-blue-500 text-white rounded`}
              onClick={handleHide}
            >
              Hide
            </button>
            :
            <button
              className={`ml-4 px-4 py-2 bg-green-500 text-white rounded`}
              onClick={handleShow}
            >
              Show
            </button>
        }
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
