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
import { useGetUserMutation} from '../slices/usersApiSlice.js';

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



  return (
    <>
      <div className='flex   overflow-hidden w-full'>
        <div>
          <AIndex />
        </div>

        <div className='  w-full'>
          <div style={{  }}>
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


              <tbody  className='  '   style={{ backgroundColor: '#ffcccc', padding: '20px', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className='h-[78.5vh]  overflow-y-auto  w-full'>
                
                {data.map((item, index) => (
                  <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}  className='flex'>
                    <td className="w-28 ml-12">
                      <input type="checkbox" onChange={(event) => handleCheckboxChange(event, item._id)} />
                    </td>
                    <td className="w-40" style={{ fontSize: '1.2rem', color: '#333' }}>{item.name}</td>
                    <td className="w-80" style={{ fontSize: '1.2rem', color: '#555' }}>{item.email}</td>
                    {/* <td className="w-2/12" style={{ fontSize: '1.2rem', color: '#555' }}>{item.isVerified}</td> */}
                    <td className="w-60" style={{ fontSize: '1.2rem', color: '#555' }}> {new Date(item.createdAt).toLocaleDateString('en-US')}</td>
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

      

    </>
  );
};

export default Users;
