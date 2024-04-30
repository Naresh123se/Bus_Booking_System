import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import Avatar from '@mui/material/Avatar';
import { CssVarsProvider } from '@mui/joy/styles';


import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();




  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      window.open("http://localhost:5000/auth/logout", "_self");
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex justify-between  pt-3 pb-3 bg-bg1 text-Slate-50    ' >
      <Link to='/' className='flex items-center gap-1  '>
        <div className='w-16  ml-20 sm:ml-3 sm:w-11' > <img src="/3.svg" alt="logo" /></div>

      </Link>

      <div className=' flex items-center space-x-8 sm:space-x-4 sm:text-[13px]  '>
        <div>Blog</div>
        <div>Ticket</div>
        {/* <Link to=/ */}
       
       
      </div>
     
      <div>

        {user && (
          <Dropdown>
            {/* MenuButton styling */}
            <MenuButton className='username flex items-center gap-2 border border-gray-300 rounded-full py-1 px-2 cursor-pointer bg-sky-500 hover:bg-hover mr-20 '>
              <AccountCircleIcon />
              {user.displayName}
            </MenuButton>

            {/* Menu styling */}
            <Menu className='bg-[#f9faff] p-2 rounded-md'>
              {/* Profile link with hover effect */}
              <MenuItem className='hover:bg-profileH cursor-pointer  border-b border-gray-300 bg-white'>
                <Link to='/profile'>Profile</Link>
              </MenuItem>

              {/* Language settings with hover effect */}
              <MenuItem className='hover:bg-profileH  cursor-pointer  border-b border-gray-300 bg-white'>
                <Link to='/language'>Language settings</Link>
              </MenuItem>

              {/* Log out with hover effect and cursor-pointer */}
              <MenuItem className='hover:bg-profileH  cursor-pointer  border-b border-gray-300 bg-white' onClick={logoutHandler}>
                Log out
              </MenuItem>
            </Menu>
          </Dropdown>
        )}

        {userInfo && !user && (
          
          <Dropdown>
            {/* MenuButton styling */}
            <MenuButton className='flex items-center gap-2 sm:gap-1 border border-[#aba5cb] rounded-full py-2 px-4   sm:py-0 sm:pl-0   sm:text-[12px] sm:mr-2 mr-20    hover:bg-hover'>
              <AccountCircleIcon   className='' />
              {userInfo.name}
            </MenuButton>

            {/* Menu styling */}
            <Menu className='bg-[#f9faff] p-2 rounded-md'>
              {/* Profile link with hover effect */}
              <MenuItem className='hover:bg-profileH  cursor-pointer  border-b border-gray-300 bg-white'>
                <Link to='/profile'>Profile</Link>
              </MenuItem>

              {/* Language settings with hover effect */}
              <MenuItem className='hover:bg-profileH  cursor-pointer  border-b border-gray-300 bg-white'>
                <Link to='/language'>Language settings</Link>
              </MenuItem>

              {/* Log out with hover effect and cursor-pointer */}
              <MenuItem className='hover:bg-profileH  cursor-pointer  border-b border-gray-300 bg-white' onClick={logoutHandler}>
                Log out
              </MenuItem>
            </Menu>
          </Dropdown>
        )}

        <div>
          {user ? (
            <div className='hidden'>
              <Navbar>
               
              </Navbar>
            </div>
          ) : userInfo ? (
            <Navbar className='pb-3 sm:pb-1'>
               
            </Navbar>
          ) : (
            <Link to='/login' className='flex items-center gap-2 sm:gap-1 border border-[#aba5cb] rounded-full py-2 px-4   sm:py-1 sm:pl-0 pr-1   sm:text-[12px] sm:mr-2 mr-20    hover:bg-hover'>
              <MenuIcon />
              <Avatar alt="Naresh" src=""  sx={{ width: 25, height: 25 }}  />
              
            </Link>
          )}
        </div>
      </div>


    </div>

    

  )
};

export default Header;
