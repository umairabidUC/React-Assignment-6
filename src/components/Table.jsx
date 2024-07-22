import React from 'react';
import Row from './Row';
import { useAddRowsMutation, useGetRowsQuery } from '../features/api/apiSlice';

const Table = () => {
  const {data:fetchedRows, status:fetchStatus, isLoading,isSuccess,isError} = useGetRowsQuery()
  const [addRows,statues] = useAddRowsMutation();

  const handleAdd = () => {
  
    addRows({Id:"2",Topic:"Arrays",Duration: 444, Link:"https://google.com",Status:true})
  }

  const handleEdit = (updatedRow) => {
    setRows(fetchedRows.map(row => (row.id === updatedRow.id ? updatedRow : row)));
    // Add API call to save the updated row here if needed
  };

  const handleDelete = (id) => {
    setRows(fetchedRows.filter(row => row.id !== id));
    // Add API call to delete the row here if needed
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
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
          {fetchedRows.map(row => (
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
