// src/components/Modal.js
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { nanoid } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTopic } from '../features/topicSlice';

const Modal = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('');
  const [link, setLink] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (topic.length < 5 || !link.match(/^https?:\/\/[^\s$.?#].[^\s]*$/)) {
      alert('Invalid input. Ensure topic is at least 5 characters and link is a valid URL.');
      return;
    }

    try {
      const newTopic = {
        Topic: topic,
        Duration: parseInt(duration, 10),
        Link: link,
        Id: nanoid(),
        Status: true,
      };
      
      const response = await axiosInstance.post('/topics', newTopic);
      dispatch(addTopic(response.data));
      onClose(); // Close modal after adding
    } catch (error) {
      console.error('Error adding topic:', error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Add Topic</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              minLength="5"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link To Resource</label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              Add Topic
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default Modal;
