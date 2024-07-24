import React, { useState, useEffect } from 'react';
import Row from './Row';
import { useGetRowsQuery, useDeleteRowMutation } from '../features/api/apiSlice';
import DeleteConfirmation from './DeleteConfirmation';
import { useSelector, useDispatch } from 'react-redux';
import { updateVisibleRows, updateHiddenRows, setMaster, setByPassMaster, setMasterClicked } from '../features/viewSlice';

const Table = () => {
  console.log("Subhan hello")
  const { data: fetchedRows, isLoading } = useGetRowsQuery()
  const isMasterChecked = useSelector(state => state.view.masterChecked)
  const dispatch = useDispatch()
  const selectedRows = useSelector(state => state.view.selectedRows)
  const masterClicked = useSelector(state => state.view.masterClicked)
  let visibleRows = 0
  let hiddenRows = 0
  const visibiltyCount = (val = true) => {
    let count = 0

    fetchedRows?.forEach(row => {
      if(row.status == val) count++
    });
    return count
  }

  const viewGlobal = useSelector(state => state.view.mode) == "show" ? true : false
  const [delRow] = useDeleteRowMutation()
  const [deleteId, setDeleteId] = useState(null);

  useEffect(()=> {
    visibleRows = visibiltyCount(true)
    hiddenRows = visibiltyCount(false)
    //debugger
    if(selectedRows.filter(rows => rows.Status == true).length === visibleRows && viewGlobal && visibleRows > 0 && !masterClicked){
      dispatch(setMaster(true))
      dispatch(setByPassMaster(true))
    }
    else if(selectedRows.filter(rows => rows.Status == false).length == hiddenRows && !viewGlobal && hiddenRows > 0&& !masterClicked){
      dispatch(setMaster(true))
      dispatch(setByPassMaster(true))
    }else dispatch(setMaster(false))
    
    console.log(isMasterChecked)
  }, [selectedRows])


  useEffect(()=>{

    dispatch(updateVisibleRows(visibiltyCount(true)))
    dispatch(updateHiddenRows(visibiltyCount(false)))
    visibleRows = visibiltyCount(true)
    console.log("VISIBLE 2:",visibleRows)
    hiddenRows = visibiltyCount(false)
  },[fetchedRows])
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
    if(checked) dispatch(setMaster(true))
    else dispatch(setMaster(false));
  console.log("MASTER CLICKED!!")
    dispatch(setMasterClicked(true))
    dispatch(setByPassMaster(false))
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300"><input type="checkbox" name="masterckbx" onChange={(e) => handleMasterCkbx(e.target.checked)} checked={isMasterChecked} /></th>
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
