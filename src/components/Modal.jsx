// src/components/Modal.js
import React from 'react';
import { nanoid } from 'nanoid';
import { useAddRowsMutation } from "../features/api/apiSlice";
import { useForm } from "react-hook-form"




const Modal = ({ isOpen, onClose }) => {

  const { register, handleSubmit, formState, reset } = useForm();
  const [addRows, statues] = useAddRowsMutation();


  const onSubmit = (data) => {
    addRows({ ...data, Status: true, Id: nanoid() })
    reset()
    onClose()
  }

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-600 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Add Topic</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="mb-4">
            <label htmlFor="topic" className="block text-sm font-medium text-white">Topic</label>
            <input
              {...register("Topic", {
                required: true,
                minLength: {
                  value: 5,
                  message: "Please make sure the length of the topic is Greater than 5."
                }

              })}
              type="text"
              id="topic"
              minLength="5"
              className="mt-1 block w-full border text-stone-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-white">Duration</label>
            <input
              {...register("Duration", {
                required: true,
                min: 0
              })}
              type="number"
              min="0"
              className="mt-1 block w-full border text-stone-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="link" className="block text-sm font-medium text-white">Link To Resource</label>
            <input
              {...register("Link", {
                required: true,
              })}
              type="url"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {statues.isLoading ? (<img src='../../public/loading-white.gif' />) : "Add Topic"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default Modal;
