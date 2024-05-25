import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';




import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';

const Header1 = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall();
      dispatch(logout());
      navigate('/admin/loginpage');
      // Add a one-time refresh after navigating to login page
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <header className='flex justify-between  pt-3 pb-3 bg-bg1 text-Slate-50 overflow-hidden ' >
      <Link to='/admin' className='flex items-center gap-1 '>
        <div className='w-16  ml-20' >
          <img src="/3.svg" alt="bus11" /></div>

      </Link>

      <div className='flex items-center space-x-8'>


      </div>

      <div>


        <Dropdown>
          {/* MenuButton styling */}
          <MenuButton className='username flex items-center gap-2 border border-[#5081F5] rounded-full py-1 px-2 cursor-pointer bg-sky-500 hover:bg-hover mr-20 '>

            {/* <AccountCircleIcon /> */}
            <img src="/logofinal11.png" className='size-8 ' alt="logo" />
            <p className='font-semibold'>ADMIN</p>
          </MenuButton>

          {/* Menu styling */}
          <Menu className='bg-[#f9faff] p-2  w-28 rounded-md'>
            {/* Profile link with hover effect */}
            <MenuItem className='hover:bg-profileH cursor-pointer  border-b border-gray-300 bg-white'>
              <Link to='/profile'>Profile</Link>
            </MenuItem>

            {/* Language settings with hover effect */}
            {/* <MenuItem className='hover:bg-profileH  cursor-pointer  border-b border-gray-300 bg-white'>
              <Link to='/language'>Language settings</Link>
            </MenuItem> */}

            {/* Log out with hover effect and cursor-pointer */}
            <MenuItem className='hover:bg-profileH  cursor-pointer  border-b border-gray-300 bg-white' onClick={logoutHandler}>
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </header>
  )
};
export default Header1;
