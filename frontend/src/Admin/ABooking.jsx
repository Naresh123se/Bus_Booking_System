import React, { useState } from 'react';
import AIndex from './AIndex.jsx'
import { jsx, css } from '@emotion/react'; // Import jsx and css from Emotion
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { toast } from 'react-toastify';
import { useAddMutation} from '../slices/schedules.js';
const CrudTable = () => {
  const [data, setData] = useState([
    { id: 1, startTime: '08:00', endTime: '18:00', startLocation: 'Home', endLocation: 'Office', price: 100 },
    // Add more initial data as needed
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  
  const [add] = useAddMutation();

  const addData = (newData) => {
    setData([...data, newData]);
    setShowAddPanel(false);
  };

  const updateData = (index, updatedData) => {
    const updatedDataArray = [...data];
    updatedDataArray[index] = updatedData;
    setData(updatedDataArray);
    setEditIndex(null);
    setOpenEditDialog(false);
  };

  const deleteData = (index) => {
    const updatedDataArray = [...data];
    updatedDataArray.splice(index, 1);
    setData(updatedDataArray);
  };

  const handleAddSubmit = (event) => {
    event.preventDefault();
    const newData = {
      id: data.length + 1,
      startTime: event.target.startTime.value,
      endTime: event.target.endTime.value,
      startLocation: event.target.startLocation.value,
      endLocation: event.target.endLocation.value,
      price: event.target.price.value,
    };
    addData(newData);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(data[index]);
    setOpenEditDialog(true);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleEditSubmit = () => {
    updateData(editIndex, editData);
  };

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const handleDeleteSelected = () => {
    setData(data.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [number, setNumber] = useState('');
  const navigate = useNavigate();


  const adding = async (e) => {
    e.preventDefault();
    try {
      await add({ startTime, endTime, startLocation, endLocation, number }).unwrap();

      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

  };



  return (
    <>
      <div className='flex'>
        <div>
          <AIndex />
        </div>

        <div className='w-full'>
          <div className="">
            <div className='text-lg font-semibold text-[#fff] bg-[#3583b1] pl-10 pt-2 pb-2 '>
              Booking Schedules
              <Button onClick={() => setShowAddPanel(true)} className="  " sx={{ marginLeft: '100vh' }}>Add New</Button>
              <Button onClick={handleDeleteSelected} className="" sx={{ marginLeft: '10px' }}>Delete Selected</Button>
            </div>

            {showAddPanel && (
              <div className="bg-white p-4 mb-4 ml-5  ">
                <h1 className="text-md font-semibold mb-2">Add New Schedules </h1>
                <form onSubmit={handleAddSubmit} className='flex gap-10'>
                  <input type="text" name="startTime" placeholder=" Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className="  border border-[#e6e3e3]   rounded-md  " />
                  <input type="text" name="endTime" placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" />
                  <input type="text" name="startLocation" placeholder="Start Location" value={startLocation} onChange={(e) => setEndTime(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" />
                  <input type="text" name="endLocation" placeholder="End Location" value={endLocation} onChange={(e) => endLocation(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" />
                  <input type="number" name="price" placeholder="Price" value={number} onChange={(e) => setNumber(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" />
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={adding}>Add</Button>
                </form>
              </div>
            )}

            <table className="min-w-full ">
              <thead className="">
                <tr className="flex  shadow-lg  mt-1 mb-1 pl-2 pt-1 pb-1          bg-[#FFF] shadow-[#b7acac] rounded-md">
                  <th className="w-1/12">Select</th>
                  <th className="w-1/12">Start Time</th>
                  <th className="w-2/12">End Time</th>
                  <th className="w-2/12">Start Location</th>
                  <th className="w-2/12">End Location</th>
                  <th className="w-2/12">Price</th>
                  <th className="w-1/12">Actions</th>
                </tr>
              </thead>

              <tbody sx={{ backgroundColor: 'red', padding: '20px' }}>
                {data.map((item, index) => (
                  <tr key={item.id} className="flex p-1 bg-[#f0f0f0]">
                    <td className="w-28 ml-12  ">
                      <input type="checkbox" onChange={(event) => handleCheckboxChange(event, item.id)} />
                    </td>
                    <td className="w-40 ">{item.startTime}</td>
                    <td className="w-2/12">{item.endTime}</td>
                    <td className="w-2/12">{item.startLocation}</td>
                    <td className="w-60">{item.endLocation}</td>
                    <td className="w-36">{item.price}</td>
                    <td className=" flex gap-2">
                      <button onClick={() => handleEdit(index)}><EditIcon className='text-[#009DF8] ml-2' /></button>
                      <button onClick={() => deleteData(index)}><DeleteIcon className='text-[red]' /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

      <Dialog className='' open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle className='text-center '>Edit Schedule</DialogTitle>
        <DialogContent >
          <form className='flex flex-col gap-4 mt-2 '>
            <TextField label="Start Time" name="startTime" value={editData.startTime} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="End Time" name="endTime" value={editData.endTime} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="Start Location" name="startLocation" value={editData.startLocation} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="End Location" name="endLocation" value={editData.endLocation} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="Price" name="price" type="number" value={editData.price} onChange={handleEditInputChange} className='mb-3' />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default CrudTable;
