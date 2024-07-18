import React, { useEffect, useState } from 'react';
import AIndex from './AIndex.jsx'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/joy/Button';
import { toast } from 'react-toastify';
import { useAddMutation, useGetScheduleMutation, useEditScheduleMutation, useDeleteScheduleMutation } from '../slices/busSchedules.js';
import { useGetbusMutation } from '../slices/bus.js';
import Loader from '../Directions/Loader';

const ABooking = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [add, { isLoading }] = useAddMutation();
  const [get] = useGetScheduleMutation();
  const [getbus] = useGetbusMutation();

  const [editSchedule] = useEditScheduleMutation(); // Hook for editing schedule
  const [deleteSchedule1] = useDeleteScheduleMutation(); // Hook for deleting schedule
  const localDate = new Date();
  const formattedDate = localDate.toISOString().split('T')[0];

  const [busId, setBusId] = useState('');
  const [bus20, setBus20] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [calender, setCalender] = useState(formattedDate);
  const [startLocation, setStartLocation] = useState('');
  const [stopLocation, setStopLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [price, setPrice] = useState('');

  // Get the current date
  const currentDate = new Date();

  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayOfWeek = currentDate.getDay();

  // Array of day names
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get the local day name using the day of the week index
  const day = daysOfWeek[dayOfWeek];

  useEffect(() => {
    fetchData();
    fetchSchedules();
    // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const result = await getbus();
      const newData = result.data.data;
      console.log("Original data1:", newData); // Log the original data

      // Create a copy of the newData array and then reverse it
      const reversedData = [...newData].reverse();
      console.log("Reversed data:", reversedData); // Log the reversed data

      // Set the reversed data in the state
      setBus20(reversedData);

    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    }
  };

  const fetchSchedules = async (e) => {
    try {

      const result = await get();

      const newSchedules = result.data.data;

      const reversedSchedules = [...newSchedules].reverse();
      setData(reversedSchedules);



    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    }
  };
  const handleAddSubmit = async (event) => {
    event.preventDefault();

    try {
      await add({ busId, startTime, endTime, calender, startLocation, stopLocation, endLocation, price, day }).unwrap();
      toast.success('Schedules added successfully');
      fetchSchedules();
      setShowAddPanel(false);
    } catch (err) {
      console.log(err)
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

  const deleteData = async (id) => {
    try {
      console.log("ID:", id); // Check the value of id
      const response = await deleteSchedule1(id); // Assuming deleteSchedule accepts ID as a parameter

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


  const handleDeleteSelected = async () => {
    try {
      if (selectedItems.length === 0) {
        throw new Error('Please select at least one item to delete.');
      }

      // Loop through each selected item and delete it
      await Promise.all(selectedItems.map(async (id) => {
        const response = await deleteSchedule1(id);
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
          <div style={{}}>
            <div className='text-lg font-semibold text-[#fff] bg-[#3583b1] pl-10 pt-2 pb-2 '>
              Schedules
              <Button onClick={() => setShowAddPanel(true)} className="  " sx={{ marginLeft: '100vh' }}>Add New</Button>
              <Button onClick={handleDeleteSelected} className="" sx={{ marginLeft: '10px' }}>Delete Selected</Button>
            </div>

            {showAddPanel && (
              <div className="bg-white p-1 mb-4 ml-5  ">
                <h1 className="text-md font-semibold mb-3">Add New Schedules </h1>
                <form onSubmit={handleAddSubmit} className='flex gap-5'>
                  <div >
                    <select type="text" className=" border border-[#bcb7b7]  rounded-md h-10" name="busId" required value={busId} onChange={(e) => setBusId(e.target.value)}>
                      {/* <select name="bus" defaultValue=""> */}
                      <option value="" disabled>Select a bus</option>
                      {bus20.map(bus => (
                        <option key={bus._id} value={bus._id}>{bus.name1}</option>
                      ))}
                    </select>
                  </div>
                  <TextField sx={{ width: '16ch' }} type="text" size='small' name="startTime" label=" Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className="  border border-[#e6e3e3]   rounded-md  " />
                  <TextField sx={{ width: '16ch' }} type="text" size='small' name="endTime" label="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" />
                  <TextField sx={{ width: '16ch' }} type="date" size='small' name="calender" label="Date" value={calender} onChange={(e) => setCalender(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" inputProps={{ min: formattedDate }} />
                  <TextField sx={{ width: '16ch' }} type="text" size='small' name="startLocation" label="Start Location" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" />
                  <TextField sx={{ width: '16ch' }} type="text" size='small' name="stopLocation" label="Stop Location" value={stopLocation} onChange={(e) => setStopLocation(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" />
                  <TextField sx={{ width: '16ch' }} type="text" size='small' name="endLocation" label="End Location" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md" />
                  <TextField sx={{ width: '16ch' }} type="number" size='small' name="price" label="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className=" input-field border border-[#e6e3e3]   rounded-md" />
                  <div>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Add</Button>
                    {isLoading && <Loader />}
                  </div>

                </form>

              </div>
            )}

            <div>
              <table className="min-w-full">
                <thead className="">
                  <tr className="flex gap-[7%]  bg-[#009DF8]  ">
                    <th className=" p-2  border-[#c2ced5] text-center bg-[#009DF8] text-white">Select</th>
                    <th className="p-2  border-[#c2ced5] text-center bg-[#009DF8] text-white">Bus</th>
                    <th className="p-2  border-[#c2ced5] text-center bg-[#009DF8] text-white w-12">StartTime</th>
                    <th className=" p-2  border-[#c2ced5] text-center bg-[#009DF8] text-white">EndTime</th>
                    <th className="p-2  border-[#c2ced5] text-center bg-[#009DF8] text-white">Date</th>
                    <th className="w-20 p-2  border-[#c2ced5] text-center bg-[#009DF8] text-white ">StartLocation</th>
                    <th className="w-20 p-2  border-[#c2ced5] text-center bg-[#009DF8] text-white">EndLocation</th>
                    <th className="p-2  border-[#c2ced5] text-center bg-[#009DF8] text-white">Price</th>
                    <th className="p-2  border-[#c2ced5] text-center bg-[#009DF8] text-white">Actions</th>
                  </tr>
                </thead>

                <tbody className='  ' style={{ backgroundColor: '#ffcccc', padding: '20px', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <div className='h-[78.5vh]  overflow-y-auto  w-full'>

                    {data.map((item, index) => (
                      <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} className='flex'>
                        <td className="w-28 ml-12">
                          <input type="checkbox" onChange={(event) => handleCheckboxChange(event, item._id)} />
                        </td>
                        <td className="w" style={{ fontSize: '1.2rem', color: '#333' }}>{item.selectedBus}</td>
                        <td className="w-36" style={{ fontSize: '1.2rem', color: '#333' }}>{item.bus.name1}</td>
                        <td className="w-36" style={{ fontSize: '1.2rem', color: '#333' }}>{item.startTime}</td>
                        <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}>{item.endTime}</td>
                        <td className="w-40" style={{ fontSize: '1.2rem', color: '#555' }}>{item.calender}</td>
                        <td className="w-48" style={{ fontSize: '1.2rem', color: '#555' }}>{item.startLocation}</td>
                        <td className="w-40" style={{ fontSize: '1.2rem', color: '#555' }}>{item.endLocation}</td>
                        <td className="w-28" style={{ fontSize: '1.2rem', color: '#555' }}>{item.price}</td>
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
            <TextField label="Start Time" type='time' name="startTime" value={editData.startTime} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="End Time" type='time' name="endTime" value={editData.endTime} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="Date" type='date' name="calender" value={editData.calender} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="Start Location" name="startLocation" value={editData.startLocation} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="Stop Location" name="stopLocation" value={editData.stopLocation} onChange={handleEditInputChange} className='mb-3' />
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
