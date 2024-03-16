import React, { useEffect, useState } from 'react';
import AIndex from './AIndex.jsx'
import { jsx, css } from '@emotion/react'; // Import jsx and css from Emotion
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { toast } from 'react-toastify';
import { useAddMutation } from '../slices/busSchedules.js';
import { useGetScheduleMutation, useEditScheduleMutation, useDeleteScheduleMutation } from '../slices/busSchedules.js';

const ABooking = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [add] = useAddMutation();
  const [get] = useGetScheduleMutation();
  const [editSchedule] = useEditScheduleMutation(); // Hook for editing schedule
  const [deleteSchedule] = useDeleteScheduleMutation(); // Hook for deleting schedule

  const addData = (newData) => {
    setData([newData, ...data]);
    setShowAddPanel(false);
  };
  // Inside ABooking component

  const deleteData = async (id) => {
    try {
      console.log("ID:", id); // Check the value of id
      const response = await deleteSchedule(id); // Assuming deleteSchedule accepts ID as a parameter

      if (response.error) {
        throw new Error(response.error.message || 'Failed to delete schedule');
      }
      setData(data.filter(item => item._id !== id));
      toast.success('Schedule deleted successfully');
    } catch (error) {
      console.error('Failed to delete schedule:', error);
      toast.error(error.message || 'Failed to delete schedule');
    }
  };




  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const { startTime, endTime, startLocation, endLocation, price } = event.target.elements;
    try {
      const response = await add({
        startTime: startTime.value,
        endTime: endTime.value,
        startLocation: startLocation.value,
        endLocation: endLocation.value,
        price: price.value
      }).unwrap();

      // Update local state with the newly added item
      addData(response.data);

      // Show success message
      toast.success('Data added successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }; 





  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // console.log(editData);

  const handleEdit = (index) => {
    setEditIndex(index);
    console.log(editIndex);
    setEditData(data[index]);
    setOpenEditDialog(true);
  };


  const handleEditSubmit = async () => {
    try {
      console.log('editData:', editData); // Log editData to check its value
      const response = await editSchedule({ id: editData._id, data: editData });

      console.log('Response:', response);
      console.log(editData);
      if (!response || !response.data || !response.data.data) {
        throw new Error('Invalid response format');
      }

      const updatedData = [...data];
      updatedData[editIndex] = response.data.data;
      setData(updatedData);

      setOpenEditDialog(false);
      setEditData({});
      setEditIndex(null);

      toast.success('Schedule updated successfully');
    } catch (error) {
      console.error('Failed to update schedule:', error);
      toast.error(error?.data?.message || error.message);
    }
  };


  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };


  const handleDeleteSelected = async () => {
    try {
      if (selectedItems.length === 0) {
        throw new Error('Please select at least one item to delete.');
      }

      // Loop through each selected item and delete it
      await Promise.all(selectedItems.map(async (id) => {
        const response = await deleteSchedule(id);
        if (response.error) {
          throw new Error(response.error.message || 'Failed to delete schedule');
        }
      }));

      // Remove deleted items from the data array
      setData(data.filter(item => !selectedItems.includes(item._id)));

      // Clear selected items
      setSelectedItems([]);

      // Clear checkboxes
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => checkbox.checked = false);

      toast.success('Selected schedules deleted successfully');
    } catch (error) {
      console.error('Failed to delete schedules:', error);
      toast.error(error.message || 'Failed to delete schedules');
    }
  };


  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async (e) => {
      try {

        const result = await get();
        setData(result.data.data);


      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setStartTime(`${hours}:${minutes}`);
    setEndTime(`${hours}:${minutes}`);

  }, []);

  return (
    <>
      <div className='flex   overflow-hidden w-full'>
        <div>
          <AIndex />
        </div>

        <div className='  w-full'>
          <div style={{  }}>
            <div className='text-lg font-semibold text-[#fff] bg-[#3583b1] pl-10 pt-2 pb-2 '>
              Booking Schedules
              <Button onClick={() => setShowAddPanel(true)} className="  " sx={{ marginLeft: '100vh' }}>Add New</Button>
              <Button onClick={handleDeleteSelected} className="" sx={{ marginLeft: '10px' }}>Delete Selected</Button>
            </div>

            {showAddPanel && (
              <div className="bg-white p-4 mb-4 ml-5  ">
                <h1 className="text-md font-semibold mb-2">Add New Schedules </h1>
                <form onSubmit={handleAddSubmit} className='flex gap-10'>
                  <input type="time" name="startTime" placeholder=" Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className="  border border-[#e6e3e3]   rounded-md  " />
                  <input type="time" name="endTime" placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" />
                  <input type="text" name="startLocation" placeholder="Start Location" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" />
                  <input type="text" name="endLocation" placeholder="End Location" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" />
                  <input type="number" name="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className=" input-field border border-[#792b2b]   rounded-md" />
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Add</Button>
                </form>
              </div>
            )}

            <div>
            <table className="min-w-full   ">
              <thead className="">
                <tr className="flex  shadow-lg  mt-1 mb-1 pl-2 pt-1 pb-1 bg-[#FFF] shadow-[#b7acac] rounded-md overflow-hidden">
                  <th className="w-1/12">Select</th>
                  <th className="w-1/12">Start Time</th>
                  <th className="w-2/12">End Time</th>
                  <th className="w-2/12">Start Location</th>
                  <th className="w-2/12">End Location</th>
                  <th className="w-2/12">Price</th>
                  <th className="w-1/12">Actions</th>
                </tr>
              </thead>



             

            
              <tbody  className='  '   style={{ backgroundColor: '#ffcccc', padding: '20px', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className='h-[78.5vh]  overflow-y-auto  w-full'>
                
                {data.map((item, index) => (
                  <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}  className='flex'>
                    <td className="w-28 ml-12">
                      <input type="checkbox" onChange={(event) => handleCheckboxChange(event, item._id)} />
                    </td>
                    <td className="w-40" style={{ fontSize: '1.2rem', color: '#333' }}>{item.startTime}</td>
                    <td className="w-2/12" style={{ fontSize: '1.2rem', color: '#555' }}>{item.endTime}</td>
                    <td className="w-2/12" style={{ fontSize: '1.2rem', color: '#555' }}>{item.startLocation}</td>
                    <td className="w-60" style={{ fontSize: '1.2rem', color: '#555' }}>{item.endLocation}</td>
                    <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}>{item.price}</td>
                    <td className="flex gap-2">
                      <button style={{ backgroundColor: '#009DF8', border: 'none', borderRadius: '4px', padding: '8px', cursor: 'pointer' }} onClick={() => handleEdit(index)}><EditIcon className='text-white ml-2' /></button>
                      <button style={{ backgroundColor: '#ff6666', border: 'none', borderRadius: '4px', padding: '8px', cursor: 'pointer' }} onClick={() => deleteData(item._id)}><DeleteIcon className='text-white' /></button>
                    </td>
                  </tr>
                ))}
                </div>
              </tbody>
          

            </table>
            </div>

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
            <TextField label="Price" name="price" type="price" value={editData.price} onChange={handleEditInputChange} className='mb-3' />
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

export default ABooking;
