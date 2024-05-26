import React, { useEffect, useState } from 'react';
import AIndex from './AIndex.jsx'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/joy/Button';
import { toast } from 'react-toastify';
import { useAddbusMutation, useGetbusMutation, useEditbusMutation, useDeletebusMutation } from '../slices/bus.js';
import { MenuItem } from '@mui/material';
import Loader from '../Directions/Loader';
const Bus = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [addbus, {isLoading}] = useAddbusMutation();
  const [getbus] = useGetbusMutation();
  const [editbus] = useEditbusMutation(); // Hook for editing schedule
  const [deleteSchedule] = useDeletebusMutation(); // Hook for deleting schedule
  const [name1, setName1] = useState('');
  const [region1, setRegion1] = useState('');
  const [lot, setLot] = useState('');
  const [number, setNumber] = useState('');
  const [alphabet, setAlphabet] = useState('');
  const [capacity, setCapacity] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const result = await getbus();
      const newData = result.data.data;
      
      console.log("Original data:", newData); // Log the original data

      // Create a copy of the newData array and then reverse it
      const reversedData = [...newData].reverse();
      console.log("Reversed data:", reversedData); // Log the reversed data

      // Set the reversed data in the state
      setData(reversedData);

      
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    }
  };


  const handleImageChange = (e) => {
        
    const files = Array.from(e.target.files);

    setSelectedImages([]);

    files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setSelectedImages((old) => [...old, reader.result]);
            }
        };
        reader.readAsDataURL(file);
    });
};



  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    selectedImages.forEach((image, index) => {
        data.append(`selectedImages[${index}]`, image);
    });
    // d
    const { name1, capacity, region1, lot, number, alphabet } = event.target.elements;  

  
    try {
      const response = await addbus({
        name1: name1.value,
        capacity: capacity.value,
        region1: region1.value,
        lot: lot.value,
        number: number.value,
        alphabet: alphabet.value,
        selectedImages
      }).unwrap();
      console.log(response)
      
      if (response.success) {
        console.log("first")
        toast.success('Bus added Successfully');
        setShowAddPanel(false);
        fetchData();
        // Reset form fields or state after successful submission
        // setPlace('');
        setSelectedImages([]);
    } 
      // Show success message
     
      
      // Assuming fetchData is a function to refetch data after adding a bus
      fetchData();
    } catch (err) {
      console.log(err);
      // Show error message
      toast.error(err?.data?.message || err.error);
    }
  };
  
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

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    console.log(editIndex);
    setEditData(data[index]);
    setOpenEditDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      console.log('editData:', editData); // Log editData to check its value
      const response = await editbus({ id: editData._id, data: editData });
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

  return (
    <>
      <div className='flex   overflow-hidden w-full'>
        <div>
          <AIndex />
        </div>

        <div className='  w-full'>
          <div style={{}}>
            <div className='text-lg font-semibold text-[#fff] bg-[#3583b1] pl-10 pt-2 pb-2 '>
              Buses
              <Button onClick={() => setShowAddPanel(true)} className="  " sx={{ marginLeft: '100vh' }}>Add New</Button>
              <Button onClick={handleDeleteSelected} className="" sx={{ marginLeft: '10px' }}>Delete Selected</Button>
            </div>

            {showAddPanel && (
              <div className="bg-white ml-10 p-1  ">
                <h1 className="text-md font-semibold ">Add New Buses</h1>
                <div className='flex justify-between'>
                  <div></div>
                <h1 className='ml-24 font-semibold flex justify-center  text-[#4a81da]'>Images </h1>
                <h1 className='font-semibold flex justify-center mr-80 text-[#4a81da]'> Bus Number</h1>
                </div>
               

                <form onSubmit={handleAddSubmit} className="flex gap-9">

                  <TextField type="text"  sx={{ width: '20ch'}}className=" border rounded-lg " size='small' name="name1" label="BusName" required value={name1} onChange={(e) => setName1(e.target.value)} />
                  <TextField type="number" sx={{ width: '20ch'}} className="form-control border rounded-lg " size='small' name="capacity" min="0" label="Capacity" required value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                  <div className=" "> 
                                            <label className="pb-2  w-40 block">
                                            </label>

                                            <input
                                                className='w-52'
                                                type="file"
                                                name="photos"
                                                id="upload"
                                                multiple
                                                onChange={handleImageChange}
                                            />
                                            <br />
                                            <div className="w-full flex items-center flex-wrap">
                                                {selectedImages.map((i, index) => (
                                                    <img
                                                        src={i}
                                                        key={index}
                                                        alt=""
                                                        className="h-[120px] w-[120px] object-cover m-2"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div>  
                  <div className="flex gap-5 border-[#4a81da] border  rounded  xl p-1">
                    <div className="">
                      <div className="row">
                        <select type="text" className=" border rounded-lg" name="region1" required value={region1} onChange={(e) => setRegion1(e.target.value)}>
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
                      <input type="number" className="form-control w-24 border rounded-lg" name="lot" min="0" placeholder="Lot" required value={lot} onChange={(e) => setLot(e.target.value)} />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                      <select className="form-control border rounded-lg" name="alphabet" required value={alphabet} onChange={(e) => setAlphabet(e.target.value)}>
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
                      <input type="number" className="form-control border rounded-lg w-24 " name="number" min="0" placeholder="Number" required value={number} onChange={(e) => setNumber(e.target.value)} />
                    </div>
                  </div>
                  </div>
                  {/* <input type="number" className="form-control border rounded-lg " name="seat" min="0" placeholder="seat Number" required value={seat} onChange={(e) => setSeat(e.target.value)} /> */}

<div>
<Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add </Button>
{isLoading && <Loader />}
</div>
                </form>
              </div>
            )}
            <div>
              <table className="min-w-full   ">
                <thead className="">
                  <tr className="flex    overflow-hidden ">
                    <th className="w-1/12  p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Select</th>
                    <th className="w-[10%] p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">BusName</th>
                    <th className="w-[14%] p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">SeatCapacity</th>
                    <th className="w-[12%] p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Lot</th>
                    <th className="w-[15%] p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Number</th>
                    <th className="w-[11%] p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Alphabet</th>
                    <th className="w-[20%] p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Region</th>
                    <th className=" pl-20 p-2 border border-[#c2ced5] text-center bg-[#009DF8] text-white">Actions</th>
                  </tr>
                </thead>

                <tbody className=' ' style={{ backgroundColor: '#ffcccc', padding: '20px', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <div className='h-[78.5vh]  overflow-y-auto  w-full'>

                    {data.map((item, index) => (
                      <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} className='flex '>
                        <td className="w-28 ml-12">
                          <input type="checkbox" onChange={(event) => handleCheckboxChange(event, item._id)} />
                        </td>
                        <td className="w-44" style={{ fontSize: '1.2rem', color: '#555' }}>{item.name1}</td>
                        <td className="w-44" style={{ fontSize: '1.2rem', color: '#333' }}>{item.capacity}</td>
                        <td className="w-44" style={{ fontSize: '1.2rem', color: '#555' }}>{item.lot}</td>
                        <td className="w-44" style={{ fontSize: '1.2rem', color: '#555' }}>{item.number}</td>
                        <td className="w-44" style={{ fontSize: '1.2rem', color: '#555' }}>{item.alphabet}</td>
                        <td className="w-44" style={{ fontSize: '1.2rem', color: '#555' }}>{item.region1}</td>

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

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle className='text-center'>Edit Schedule</DialogTitle>
        <DialogContent>
          <form className='flex flex-col gap-4 mt-2'>
            <TextField label="Name" name="name1" type="text" value={editData.name1} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="capacity" name="capacity" type="number" value={editData.capacity} onChange={handleEditInputChange} className='mb-3' />

            <TextField
              select
              label="Region"
              name="region1"
              value={editData.region1 || ''}
              onChange={handleEditInputChange}
              className='mb-3'
            >
              <MenuItem value="">-- Region --</MenuItem>
              <MenuItem value="लुम्बिनी प्रदेश">लुम्बिनी प्रदेश</MenuItem>
              <MenuItem value="कर्णाली प्रदेश">कर्णाली प्रदेश</MenuItem>
              <MenuItem value="बागमती प्रदेश">बागमती प्रदेश</MenuItem>

              <MenuItem value="गण्डकी प्रदेश">गण्डकी प्रदेश</MenuItem>

              <MenuItem value="मधेश प्रदेश">मधेश प्रदेश</MenuItem>

              <MenuItem value="प्रदेश ३">प्रदेश ३</MenuItem>

              <MenuItem value="प्रदेश ६">प्रदेश ६</MenuItem>

              <MenuItem value="प्रदेश २">प्रदेश २</MenuItem>

              <MenuItem value="सुप.प्र">सुप.प्र</MenuItem>

              <MenuItem value="बा">बा</MenuItem>

              <MenuItem value="लु">लु</MenuItem>

              <MenuItem value="रा">रा</MenuItem>

              <MenuItem value="भे">भे</MenuItem>

              <MenuItem value="ना">ना</MenuItem>

              <MenuItem value="से">से</MenuItem>

              <MenuItem value="मा">मा</MenuItem>

              <MenuItem value="ग">ग</MenuItem>

              <MenuItem value="ध">ध</MenuItem>

              <MenuItem value="स">स</MenuItem>

              <MenuItem value="ज">ज</MenuItem>
            </TextField>

            <TextField label="Lot" name="lot" value={editData.lot} onChange={handleEditInputChange} className='mb-3' />
            <TextField label="Number" name="number" value={editData.number} onChange={handleEditInputChange} className='mb-3' />

            <TextField
              select
              label="Alphabet"
              name="alphabet"
              value={editData.alphabet || ''}
              onChange={handleEditInputChange}
              className='mb-3'
            >
              <MenuItem value="" selected="selected">-- Alphabet --</MenuItem>
              <MenuItem value="क">क</MenuItem>

              <MenuItem value="ख">ख</MenuItem>

              <MenuItem value="ग">ग</MenuItem>

              <MenuItem value="घ">घ</MenuItem>

              <MenuItem value="ङ">ङ</MenuItem>

              <MenuItem value="च">च</MenuItem>

              <MenuItem value="छ">छ</MenuItem>

              <MenuItem value="ज">ज</MenuItem>

              <MenuItem value="झ">झ</MenuItem>

              <MenuItem value="ञ">ञ</MenuItem>

              <MenuItem value="ट">ट</MenuItem>

              <MenuItem value="ठ">ठ</MenuItem>

              <MenuItem value="ड">ड</MenuItem>

              <MenuItem value="ढ">ढ</MenuItem>

              <MenuItem value="ण">ण</MenuItem>

              <MenuItem value="त">त</MenuItem>

              <MenuItem value="थ">थ</MenuItem>

              <MenuItem value="द">द</MenuItem>

              <MenuItem value="ध">ध</MenuItem>

              <MenuItem value="न">न</MenuItem>

              <MenuItem value="प">प</MenuItem>

              <MenuItem value="फ">फ</MenuItem>

              <MenuItem value="ब">ब</MenuItem>

              <MenuItem value="भ">भ</MenuItem>

              <MenuItem value="म">म</MenuItem>

              <MenuItem value="य">य</MenuItem>

              <MenuItem value="र">र</MenuItem>

              <MenuItem value="ल">ल</MenuItem>

              <MenuItem value="व">व</MenuItem>

              <MenuItem value="श">श</MenuItem>

              <MenuItem value="ष">ष</MenuItem>

              <MenuItem value="स">स</MenuItem>

              <MenuItem value="ह">ह</MenuItem>

              <MenuItem value="क्ष">क्ष</MenuItem>

              <MenuItem value="त्र">त्र</MenuItem>

              <MenuItem value="ज्ञ">ज्ञ</MenuItem>



            </TextField>



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

export default Bus;      
