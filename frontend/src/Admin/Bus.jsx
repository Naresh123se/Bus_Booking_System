import React, { useEffect, useState } from 'react';
import AIndex from './AIndex.jsx'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { toast } from 'react-toastify';
import { useAddbusMutation } from '../slices/bus.js';
import { useGetbusMutation, useEditScheduleMutation, useDeleteScheduleMutation } from '../slices/bus.js';

const ABooking = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [addbus] = useAddbusMutation();
  const [getbus] = useGetbusMutation();
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

    // const { region, lot,number,alphabet,  capacity, seat   } = event.target.elements;

    try {
     await addbus({
      region, lot,number,alphabet,  capacity, seat 
     }).unwrap();



      // const response = await addbus({
      //   region: region.value,
      //   lot: lot.value,
      //   number: number.value,
      //   alphabet: alphabet.value,
      //   capacity: capacity.value,
      //   seat: seat.value,
      // }).unwrap();




      // addData(response.data);
      // Show success message
      toast.success('Data added successfully');
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


  const [region, setRegion] = useState('');
  const [lot, setLot] = useState('');
  const [number, setNumber] = useState('');
  const [alphabet, setAlphabet] = useState('');
  const [capacity, setCapacity] = useState('');
  const [seat, setSeat] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async (e) => {
      try {

        const result = await getbus();
        console.log(result)
        setData(result.data.data);


      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      }
    };

    fetchSchedules();
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
              Booking Schedules
              <Button onClick={() => setShowAddPanel(true)} className="  " sx={{ marginLeft: '100vh' }}>Add New</Button>
              <Button onClick={handleDeleteSelected} className="" sx={{ marginLeft: '10px' }}>Delete Selected</Button>
            </div>

            {showAddPanel && (
              <div className="bg-white ml-5  ">
                <h1 className="text-md font-semibold">Add New Buses</h1>
                <h1 className='font-semibold'> Bus Number</h1>
                <form onSubmit={handleAddSubmit} className="flex gap-10">


                  <div className="flex gap-5 border-[#4a81da] border  rounded  xl p-1">

                    <div className="">

                      {/* <label htmlFor="license_plate_number">License Plate Number</label> */}
                      <div className="row">
                        <select id="license_plate_region" className="form-control border rounded-lg " name="license_plate_region" required value={region} onChange={(e) => setRegion(e.target.value)}>
                          <option value="" selected="selected">-- Region --</option>
                          <option value="लुम्बिनी प्रदेश">लुम्बिनी प्रदेश</option>

                          <option value="कर्णाली प्रदेश">कर्णाली प्रदेश</option>

                          <option value="बागमती प्रदेश">बागमती प्रदेश</option>

                          <option value="गण्डकी प्रदेश">गण्डकी प्रदेश</option>

                          <option value="मधेश प्रदेश">मधेश प्रदेश</option>

                          <option value="प्रदेश ३">प्रदेश ३</option>

                          <option value="प्रदेश ६">प्रदेश ६</option>

                          <option value="प्रदेश २">प्रदेश २</option>

                          <option value="सुप.प्र">सुप.प्र</option>

                          <option value="बा">बा</option>

                          <option value="लु">लु</option>

                          <option value="रा">रा</option>

                          <option value="भे">भे</option>

                          <option value="ना">ना</option>

                          <option value="से">से</option>

                          <option value="मा">मा</option>

                          <option value="ग">ग</option>

                          <option value="ध">ध</option>

                          <option value="स">स</option>

                          <option value="ज">ज</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                      <input id="license_plate_lot" type="number" className="form-control border rounded-lg" name="license_plate_lot" min="0" placeholder="Lot" required value={lot} onChange={(e) => setLot(e.target.value)} />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                      <select id="license_plate_alphabet" className="form-control border rounded-lg" name="license_plate_alphabet" required value={alphabet} onChange={(e) => setAlphabet(e.target.value)}>
                        <option value="" selected="selected">-- Alphabet --</option>
                        <option value="क">क</option>

                        <option value="ख">ख</option>

                        <option value="ग">ग</option>

                        <option value="घ">घ</option>

                        <option value="ङ">ङ</option>

                        <option value="च">च</option>

                        <option value="छ">छ</option>

                        <option value="ज">ज</option>

                        <option value="झ">झ</option>

                        <option value="ञ">ञ</option>

                        <option value="ट">ट</option>

                        <option value="ठ">ठ</option>

                        <option value="ड">ड</option>

                        <option value="ढ">ढ</option>

                        <option value="ण">ण</option>

                        <option value="त">त</option>

                        <option value="थ">थ</option>

                        <option value="द">द</option>

                        <option value="ध">ध</option>

                        <option value="न">न</option>

                        <option value="प">प</option>

                        <option value="फ">फ</option>

                        <option value="ब">ब</option>

                        <option value="भ">भ</option>

                        <option value="म">म</option>

                        <option value="य">य</option>

                        <option value="र">र</option>

                        <option value="ल">ल</option>

                        <option value="व">व</option>

                        <option value="श">श</option>

                        <option value="ष">ष</option>

                        <option value="स">स</option>

                        <option value="ह">ह</option>

                        <option value="क्ष">क्ष</option>

                        <option value="त्र">त्र</option>

                        <option value="ज्ञ">ज्ञ</option>
                      </select>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                      <input id="license_plate_number" type="number" className="form-control border rounded-lg " name="license_plate_number" min="0" placeholder="Number" required value={number} onChange={(e) => setNumber(e.target.value)} />
                    </div>
                  </div>
                  <input id="license_plate_number" type="number" className="form-control border rounded-lg " name="license_plate_number" min="0" placeholder="Capacity" required value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                  <input id="license_plate_number" type="number" className="form-control border rounded-lg " name="license_plate_number" min="0" placeholder="seat Number" required value={seat} onChange={(e) => setSeat(e.target.value)} />


                  <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</Button>
                </form>
              </div>
            )}

            <div>
              <table className="min-w-full   ">
                <thead className="">
                  <tr className="flex  shadow-lg  mt-1 mb-1 pl-2 pt-1 pb-1 bg-[#FFF] shadow-[#b7acac] rounded-md overflow-hidden">
                    <th className="w-1/12">Select</th>
                    <th className="w-1/12">Bus_Number </th>

                    <th className="w-2/12">End Time</th>
                    <th className="w-2/12">Start Location</th>
                    <th className="w-2/12">End Location</th>
                    <th className="w-2/12">Price</th>
                    <th className="w-1/12">Actions</th>
                  </tr>
                </thead>

                <tbody className='  ' style={{ backgroundColor: '#ffcccc', padding: '20px', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <div className='h-[78.5vh]  overflow-y-auto  w-full'>

                    {data.map((item, index) => (
                      <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} className='flex'>
                        <td className="w-28 ml-12">
                          <input type="checkbox" onChange={(event) => handleCheckboxChange(event, item._id)} />
                        </td>
                        <td className="w-40" style={{ fontSize: '1.2rem', color: '#333' }}>{item.region}</td>
                        <td className="w-2/12" style={{ fontSize: '1.2rem', color: '#555' }}>{item.lot}</td>
                        <td className="w-2/12" style={{ fontSize: '1.2rem', color: '#555' }}>{item.number}</td>
                        <td className="w-60" style={{ fontSize: '1.2rem', color: '#555' }}>{item.alphabet}</td>
                        <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}>{item.capacity}</td>
                        <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}>{item.seat}</td>
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
            <TextField label="Start Location" name="number" value={editData.number} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="End Location" name="alphabet" value={editData.alphabet} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="Price" name="capacity" type="capacity" value={editData.capacity} onChange={handleEditInputChange} className='mb-3' />
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
