import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import Avatar from '@mui/material/Avatar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PrintIcon from '@mui/icons-material/Print';
import CancelIcon from '@mui/icons-material/Cancel';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const getTicket = () => {
    // Handle navigation here
    navigate('/print-ticket'); // Navigate to '/home'
};
  const cancelTicket = () => {
    // Handle navigation here
    navigate('/cancel-Ticket'); // Navigate to '/home'
};
  const blogGo = () => {
    // Handle navigation here
    navigate('/BlogList'); // Navigate to '/home'
};




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

      <div className=' flex items-center space-x-8 sm:space-x-4 sm:text-[13px] font-medium  '>
        <div className=' cursor-pointer   hover:bg-[#60c5ff] p-1 rounded-md' onClick={blogGo}>Blog</div>
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
        >
            <button
                type="button"
                className=" justify-center mt-1.5  text-sm rounded-md group-hover:bg-[#bbbbd7] relative  "
            >
                Ticket
                {/* Drop-down and up arrow icons */}
                {isDropdownOpen ? (
                    <KeyboardArrowUpIcon />
                ) : (
                    <KeyboardArrowDownIcon />
                )}
            </button>
            {isDropdownOpen && (
                <div className="absolute   sm:px-0 bg-[white]  z-50 ">
                    <div className="rounded-sm shadow-lg ring-1  overflow-hidden w-full ">
                        <div className="relative grid gap-1 bg-white  sm:gap-8 sm:p-8 w-full ">
                            <a
                                onClick={getTicket}
                                className="hover:bg-[#e3d9d9] flex  pr-4 cursor-pointer "
                            >
                                <div className="ml-4 flex w-full">
                                <div className="flex  items-center mr-2 w-full ">
                                <PrintIcon/>
    </div>
                                    <p className="text-base font-medium text-gray-900">
                                     Print Ticket
                                    </p>
                                </div>
                            </a>
                            <a
                                onClick={cancelTicket} 
                                className="hover:bg-[#e3d9d9] flex pr-4  cursor-pointer"
                            >
                                <div className="ml-4 flex" >
                                  
                                <div className="flex  items-center mr-2 ">
      <CancelIcon />
    </div>
                                    <p className="text-base font-medium text-gray-900">
                                   Cancel Ticket
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
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
              <AccountCircleIcon className='' />
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
              <Avatar alt="Naresh" src="" sx={{ width: 25, height: 25 }} />

            </Link>
          )}
        </div>
      </div>


    </div>



  )
};

export default Header;
