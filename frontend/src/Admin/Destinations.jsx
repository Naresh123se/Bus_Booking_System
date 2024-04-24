import React, { useEffect, useState } from 'react';
import AIndex from './AIndex.jsx'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { toast } from 'react-toastify';
import { useAddbusMutation } from '../slices/bus.js';
import { useGetbusMutation, useEditbusMutation, useDeletebusMutation } from '../slices/bus.js';
import { useAddDeccMutation, useGetDessMutation } from '../slices/destinations.js';


const Destinations = () => {
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({});
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const [addbus] = useAddbusMutation();
    const [getbus] = useGetbusMutation();
    const [editbus] = useEditbusMutation(); // Hook for editing schedule
    const [deleteSchedule] = useDeletebusMutation(); // Hook for deleting schedule
    
    
    const [addDecc] = useAddDeccMutation(); // Hook for deleting schedule
    const [getDess] = useGetDessMutation(); // Hook for deleting schedule



    const [name1, setName1] = useState('');
    const [region1, setRegion1] = useState('');
    const [lot, setLot] = useState('');
    const [number, setNumber] = useState('');
    const [alphabet, setAlphabet] = useState('');
    const [capacity, setCapacity] = useState('');


    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    const fetchData = async () => {
        try {
            const result = await getDess();
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


// 


    const [place, setPlace] = useState([]);

    const [selectedImages, setSelectedImages] = useState([]);
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
    
      
    //   console.log("Selected images:",   setSelectedImages(files));
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        selectedImages.forEach((image, index) => {
          data.append(`selectedImages[${index}]`, image);
        });
        data.append('place', place);
      
        try {
          // Assuming addDecc returns a promise
          await addDecc({place, selectedImages});
          // If addDecc doesn't throw an error, it's considered successful
          toast.success('Post Created Successfully');
          // Reset form fields or state after successful submission
          setPlace('');
          setSelectedImages([]);
        } catch (error) {
          // If addDecc throws an error, handle it here
          toast.error(error.message || 'An error occurred while creating the post');
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
            const response = await editbus({ id: editData._id, data: editData });

            // console.log('Response:', response);
            // console.log(editData);
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




    const navigate = useNavigate();


    



    return (
        <>
            <div className='flex   overflow-hidden w-full'>
                <div>
                    <AIndex />
                </div>

                <div className='  w-full'>
                    <div style={{}}>
                        <div className='text-lg font-semibold text-[#fff] bg-[#3583b1] pl-10 pt-2 pb-2 '>
                            New Destination
                            <Button onClick={() => setShowAddPanel(true)} className="  " sx={{ marginLeft: '100vh' }}>Add New</Button>
                            <Button onClick={handleDeleteSelected} className="" sx={{ marginLeft: '10px' }}>Delete Selected</Button>
                        </div>

                        {showAddPanel && (
                            <div className="bg-white ml-10   ">
                                <h1>Image Uploader</h1>

  


                                <form onSubmit={handleSubmit} className="flex flex-col ">
          <br />
          <div>
            <label className="pb-2">
              Caption <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="place"
              value={place}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Your Status...."
            />
          </div>

          <div className="mt-4">
            <label className="pb-2">Upload Images</label>
            <input
              type="file"
              name="photos"
              id="upload"
            //   className="hidden"
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

            <div className="mt-4">
              <input
                type="submit"
                value="Upload"
                // disabled={isLoading}
                className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
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
                                                <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}>{item.place}</td>
                                                {/* <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}>{item.selectedImages.url}</td> */}
                                                {item.selectedImages.map((image, index) => (
  <React.Fragment key={index}>
    <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}></td>
    <td className="w-36">
      <img src={image.url} alt="Image" />
    </td>
  </React.Fragment>
))}



                                                <td className="w-2/12" style={{ fontSize: '1.2rem', color: '#555' }}>{item.lot}</td>
                                                <td className="w-2/12" style={{ fontSize: '1.2rem', color: '#555' }}>{item.number}</td>
                                                <td className="w-60" style={{ fontSize: '1.2rem', color: '#555' }}>{item.alphabet}</td>
                                                <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}>{item.capacity}</td>

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
                    ol
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={handleEditSubmit}>Save</Button>
                </DialogActions>
            </Dialog>


        </>
    );
};

export default Destinations;      
