import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from './Row';

const Table = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/topics');
        setRows(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (updatedRow) => {
    setRows(rows.map(row => (row.id === updatedRow.id ? updatedRow : row)));
    // Add API call to save the updated row here if needed
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
    // Add API call to delete the row here if needed
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300">Select</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">ID</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Topic</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Duration</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Link</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Status</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <Row
              key={row.id}
              id={row.id}
              topic={row.topic}
              duration={row.duration}
              link={row.link}
              status={row.status}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
