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
// import { useGetScheduleMutation, useEditScheduleMutation, useDeleteScheduleMutation } from '../slices/busSchedules.js';
import { useGetUserMutation } from '../slices/usersApiSlice.js';
import Seat from '../Booking/Seat.jsx'



import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const Users = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // const [add] = useAddMutation();
  const [user] = useGetUserMutation();
  // const [editSchedule] = useEditScheduleMutation(); // Hook for editing schedule
  // const [deleteSchedule] = useDeleteScheduleMutation(); // Hook for deleting schedule


  // Inside Users component

 










  // console.log(editData);






  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async (e) => {
      try {

        const result = await user();
        setData(result.data.data);

        console.log(result);

      } catch (error) {
        console.error('Failed to fetch schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  
  const [value, setValue] = React.useState(false);
const [id, setId] = React.useState()
  const handleChange = async (event) => {
    const newValue = event.target.checked;
    setValue(newValue);
    try {
      const response = await fetch('http://localhost:4000/api/users/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: newValue, id:id }),
      });
      if (!response.ok) {
        throw new Error('Failed to update value');
      }
      console.log(`Switch toggled to ${newValue}`);
      // Add your logic here to handle any UI updates if necessary
    } catch (error) {
      console.error('Error updating value:', error);
      // Add your error handling logic here
    }
  };



  const deleteData = async (id) => {
    try {
      console.log(id)
     setId(id) 
      
      // Add your deletion logic here
    } catch (error) {
      console.error('Error deleting data:', error);
      // Handle any errors that occur during the deletion process
    }
  };
  console.log(id)


  


  return (
    <>
      <div className='flex   overflow-hidden w-full'>
        <div>
          <AIndex />
        </div>

        <div className='  w-full'>
          <div style={{}}>
            <div className='text-lg font-semibold text-[#fff] bg-[#3583b1] pl-10 pt-2 pb-2 '>
              Users
              {/* <Button onClick={() => setShowAddPanel(true)} className="  " sx={{ marginLeft: '100vh' }}>Add New</Button> */}
              {/* <Button onClick={handleDeleteSelected} className="" sx={{ marginLeft: '10px' }}>Delete Selected</Button> */}
            </div>



            <div>
              <table className="min-w-full   ">
                <thead className="">
                  <tr className="flex  shadow-lg  mt-1 mb-1 pl-2 pt-1 pb-1 bg-[#FFF] shadow-[#b7acac] rounded-md overflow-hidden">
                    <th className="w-1/12">Select</th>
                    <th className="w-1/12">Name</th>
                    <th className="w-2/12">email</th>
                    <th className="w-2/12">Address</th>
                    <th className="w-2/12">Phone Number</th>
                    <th className="w-2/12">Verify</th>
                    {/* <th className="w-1/12">Actions</th> */}
                  </tr>
                </thead>


                <tbody className='' style={{ backgroundColor: '#ffcccc', padding: '20px', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
  <div className='h-[78.5vh] overflow-y-auto w-full'>
    {data.map((item, index) => (
      <tr key={item.id} style={{ 
        backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        ...(item.active ? { backgroundColor: '#eff7ff' } : { backgroundColor: '#fdeeee' }), // Apply different background color based on active status
      }} className='flex'>
        <td className="w-28 ml-12">
          <input type="checkbox" onChange={(event) => handleCheckboxChange(event, item._id)} />
        </td>
        <td className="w-40" style={{ fontSize: '1.2rem', color: '#333' }}>{item.name}</td>
        <td className="w-80" style={{ fontSize: '1.2rem', color: '#555' }}>{item.email}</td>
        {/* <td className="w-2/12" style={{ fontSize: '1.2rem', color: '#555' }}>{item.isVerified}</td> */}
        <td className="w-60" style={{ fontSize: '1.2rem', color: '#555' }}> {new Date(item.createdAt).toLocaleDateString('en-US')}</td>
        <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}>{item.price}</td>
        <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}>{item.active}</td>

        <span onClick={() => deleteData(item._id)}>

        <FormGroup>
      <FormControlLabel
        control={<Android12Switch checked={value} onChange={handleChange} />}
        label=""
      />
    </FormGroup>
        </span>


     

    

      
        {/* <td className="flex gap-2">
          <button style={{ backgroundColor: '#009DF8', border: 'none', borderRadius: '4px', padding: '8px', cursor: 'pointer' }} onClick={() => handleEdit(index)}><EditIcon className='text-white ml-2' /></button>
          <button style={{ backgroundColor: '#ff6666', border: 'none', borderRadius: '4px', padding: '8px', cursor: 'pointer' }} onClick={() => deleteData(item._id)}>
            
            
            
            
           </button>
        </td> */}
      </tr>
    ))}
  </div>
</tbody>


              </table>
            </div>

          </div>
        </div>
      </div>



    </>
  );
};

export default Users;
