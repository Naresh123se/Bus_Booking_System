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




import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();





  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className='flex justify-between p-4 bg-bg1 text-Slate-50'>
      <Link to='/' className='flex items-center gap-1 '>
        <AccountCircleIcon />
        <span className='z-20'>Logo</span>
      </Link>

      <div className='flex items-center space-x-8'>
        <div>Home</div>
        <div>About</div>
        <div>Blog</div>
        <button className='mt-2'>
          <SearchIcon />
        </button>
      </div>

      <div>


        {userInfo && (
          <Dropdown >
            {/* MenuButton styling */}
            <MenuButton className='username flex items-center gap-2 border border-gray-300 rounded-full py-1 px-2 cursor-pointer bg-sky-500 hover:bg-[#5972ff] '>
              <AccountCircleIcon />
              {userInfo.name}
            </MenuButton>

            {/* Menu styling */}
            <Menu className='bg-[#f9faff] p-2 rounded-md'>
              {/* Profile link with hover effect */}

              <MenuItem className='hover:bg-[#5972ff] cursor-pointer  border-b border-gray-300 bg-white' >
                <Link to='/ram'>
                  Profile
                </Link>
              </MenuItem>


              {/* Language settings with hover effect */}
              <MenuItem className='hover:bg-[#5972ff] cursor-pointer border-b border-gray-300 bg-white'>
                <Link to='/ram'>
                  Language settings
                </Link>

              </MenuItem>

              {/* Log out with hover effect and cursor-pointer */}
              <MenuItem className='hover:bg-[#5972ff] cursor-pointer border-b border-gray-300 bg-white' onClick={logoutHandler}>
                Log out
              </MenuItem>
            </Menu>
          </Dropdown>



        )}
      </div>

      {userInfo ? (
        <div className='hidden'>
          <Navbar>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='flex flex-col items-end'>
                <NavDropdown title={userInfo.name} id='username' className='flex flex-col items-end'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className='hover:text-blue-500'>Profile12</NavDropdown.Item>
                  </LinkContainer>
                  <div>car</div>
                  <NavDropdown.Item onClick={logoutHandler} className='hover:text-red-500'>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

      ) : (
        <Link to='/login' className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 '>
          <MenuIcon />
          <AccountCircleIcon />
        </Link>
      )}
    </header>
  );
};

export default Header;
