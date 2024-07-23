import React, { useState, useEffect } from 'react';
import Row from './Row';
import { useGetRowsQuery, useDeleteRowMutation } from '../features/api/apiSlice';
import DeleteConfirmation from './DeleteConfirmation';
import { useSelector, useDispatch } from 'react-redux';
import { updateVisibleRows, updateHiddenRows } from '../features/viewSlice';

const Table = () => {
  const { data: fetchedRows, isLoading } = useGetRowsQuery()
  const [isMasterChecked, setIsMasterChecked] = useState(false)
  const dispatch = useDispatch()
  const selectedRows = useSelector(state => state.view.selectedRows)
  const visibleRows = useSelector(state => state.view.visibleRows)
  const hiddenRows = useSelector(state => state.view.hiddenRows)
  const visibiltyCount = (val = true) => {
    return fetchedRows?.every(row => row.status == val).length
  }
  const visibilty = visibiltyCount()
  console.log(visibilty)

  const viewGlobal = useSelector(state => state.view.mode) == "show" ? true : false
  const [delRow] = useDeleteRowMutation()
  const [deleteId, setDeleteId] = useState(null);



  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  const handleDeleteConfirm = (id) => {
    delRow(id)
    setDeleteId(null);
  };

  const handleMasterCkbx = (checked) => {
    setIsMasterChecked(checked)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300"><input type="checkbox" name="masterckbx" onChange={(e) => handleMasterCkbx(e.target.checked)} /></th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Topic</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Duration</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Link</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fetchedRows?.map(row => {
            if (viewGlobal == row.status) {
              return <Row
                key={row.id}
                id={row.id}
                topic={row.topic}
                duration={row.duration}
                link={row.link}
                status={row.status}
                masterChecked={isMasterChecked}
                onDeleteClick={handleDeleteClick}
              />
            }
          }
          )}
        </tbody>
      </table>
      {deleteId && (
        <DeleteConfirmation
          id={deleteId}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default Table;
