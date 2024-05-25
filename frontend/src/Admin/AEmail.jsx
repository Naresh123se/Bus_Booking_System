import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/joy/Button';
import AIndex from './AIndex.jsx';
import { useGetUserMutation } from '../slices/usersApiSlice.js';
import { useSendMailMutation } from '../slices/email.js';
import Loader from '../Directions/Loader';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';

const Extra = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [emailID, setEmailID] = useState('');
  const [user] = useGetUserMutation();
  const editor = useRef(null);
  const [sendEmail, { isLoading }] = useSendMailMutation();



  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const result = await user();
        const newData = result.data.data;
        setData(newData);
        console.log(result);
      } catch (error) {
        console.error('Failed to fetch Email:', error);
      }
    };
    fetchSchedules();
  }, [user]);

  useEffect(() => {
    // Find the user object that matches the selected emailID
    const selectedUser = data.find(user => user._id === emailID);
    if (selectedUser) {
      setName(selectedUser.name); // Set the name based on the selected user
      setEmail(selectedUser.email); 
    } else {
      setName('');
      setEmail('');
    }
  }, [emailID, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendEmail({ email, name, subject, message });
      if (response.data.success) {
        toast.success('Email send Successfully');
      } else {
        toast.error('Failed to send Email' || error.message);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while sending the Email');
    }
  };


  const config = useMemo(() => ({
    height: 400, // Set the height of the editor
    readonly: false, // All options from https://xdsoft.net/jodit/doc/
    toolbarSticky: false, // Keeps the toolbar non-sticky if that might cause issues
  }), []);

  const handleBlur = useCallback((newContent) => {
    setMessage(newContent);
  }, []);

  return (
    <>
      <div className='flex overflow-hidden w-full'>
        <div>
          <AIndex />
        </div>
        <div className='w-full'>
          <div>
            <div className='text-lg font-semibold text-[#fff] bg-[#3583b1] pl-10 pt-2 pb-2 '>
              SEND EMAIL
            </div>
            <div className="flex w-full ">
              <div className="bg-white p-8 rounded-lg  w-[72rem]">
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className='flex  gap-5'>
                    <select
                      className="border border-[#bcb7b7] h-10 w-full rounded-md"
                      name="emailID"
                      required
                      value={emailID}
                      onChange={(e) => setEmailID(e.target.value)}
                    >
                      <option value="" disabled>Select User Email</option>
                      {data.map(user => (
                        <option key={user._id} value={user._id}>{user.email}</option>
                      ))}
                    </select>
                    <TextField
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                      type="text"
                      size="small"
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      fullWidth
                    />
                  </div>
                  <TextField
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                    type="text"
                    size="small"
                    label="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    fullWidth
                  />
                  <div className='w-[70rem]'>
                    <JoditEditor
                      ref={editor}
                      value={message}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={handleBlur} // preferred to use only this option to update the content for performance reasons
                      onChange={newContent => setMessage(newContent)}
                    />
                  </div>
                  <Button type="submit" sx={{ width: '100%' }}>
                    SEND
                    {isLoading && <Loader />}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Extra;
