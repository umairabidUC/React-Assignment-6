import React, { useState } from 'react';

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')} Hours ${mins.toString().padStart(2, '0')} Minutes`;
};

const Row = ({ id, topic, duration, link, status, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({ id, topic, duration, link, status });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onEdit(formData);  // If editing is being turned off, save the changes
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-100">
      <td className="px-6 py-4">
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          readOnly={!isEditing}
          className="w-full border-none bg-transparent focus:ring-0"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          readOnly={!isEditing}
          className="w-full border-none bg-transparent focus:ring-0"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="duration"
          value={isEditing ? formData.duration : formatDuration(formData.duration)}
          onChange={handleChange}
          readOnly={!isEditing}
          className="w-full border-none bg-transparent focus:ring-0"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          readOnly={!isEditing}
          className="w-full border-none bg-transparent focus:ring-0"
        />
      </td>
      <td className="px-6 py-4">
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          readOnly={!isEditing}
          className="w-full border-none bg-transparent focus:ring-0"
        />
      </td>
      <td className="px-6 py-4 flex justify-end space-x-2">
        <button
          onClick={handleEditToggle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Row;
