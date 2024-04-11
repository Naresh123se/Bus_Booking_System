import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../Directions/Loader';

import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        } else if (user) {
            setName(user.displayName);
            setEmail(user.email);
        }
    }, [userInfo, user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo?._id || user?._id,
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className=" w-80 pb-7 mx-[40%] border mt-10 border-[#b7acac] rounded-xl">
            <div>
                <h2 className="text-2xl font-medium ml-20 mt-4">Update Profile</h2>
            </div>
            <Form onSubmit={submitHandler} className="max-w-md mx-auto ml-10 mt-4">
                {(userInfo || user) && (
                    <>
                        <Form.Group controlId='name' className='mb-4'>
                            <Form.Label><PersonIcon sx={{ fontSize: 21 }} /> Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`border border-[#a99090] px-3 py-2 rounded-md flex ${user
                                    ? 'cursor-not-allowed bg-white'
                                    : '' // Empty string if user is not present
                                    }`}
                                readOnly={user} // Making the input non-editable if user is present
                                style={{ pointerEvents: user ? 'none' : 'auto' }} // Disabling pointer events if user is present
                            />
                        </Form.Group>

                        <Form.Group controlId='email' className='mb-4'>
                            <Form.Label><AlternateEmailIcon sx={{ fontSize: 21 }} /> Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                readOnly // Making the input non-editable
                                className='border border-[#a99090] px-3 py-2 rounded-md flex cursor-not-allowed bg-white'
                                style={{ pointerEvents: 'none' }} // Disabling pointer events
                            />
                        </Form.Group>
                    </>
                )}
                {userInfo && (
                    <>
                        <Form.Group controlId='password' className='mb-4'>
                            <Form.Label><LockIcon sx={{ fontSize: 21 }} /> Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border border-[#a99090] px-3 py-2 rounded-md flex'
                            />
                        </Form.Group>
                        <Form.Group controlId='confirmPassword' className='mb-4'>
                            <Form.Label><LockIcon sx={{ fontSize: 21 }} /> Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='border border-[#a99090] px-3 py-2 rounded-md flex'
                            />
                        </Form.Group>
                    </>
                )}
                <div className='mt-5 w-24 rounded-md'>
                    {user ? ( // If user exists
                        <Button
                        sx={{ 
                            background: '#1976D2', 
                            color: 'white', 
                            ":hover": { background: 'red', color: 'white' },
                            cursor: 'not-allowed' // Add the cursor property here
                        }}
                        type='submit'
                        variant="disabled" 
                    >
                        Disabled
                    </Button>
                    
                    ) : ( // If user doesn't exist
                        <Button className=''
                            type='submit'
                            variant="contained"
                        >
                            Update
                        </Button>
                    )}
                </div>
                {isLoading && <Loader />}
            </Form>
        </div>
    );
};

export default Profile;
