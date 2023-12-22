import React from 'react'
import {Link} from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <header className='flex justify-between p-4 bg-bg1 text-Slate-50'>
    <a href="" className="flex items-center gap-1" ><AccountCircleIcon />
    <span>logo</span>
    </a>
    <div className='flex items-center space-x-8'>
      <div>Home</div>
      <div>About</div>
      <div>Blog</div>
      <button className='mt-2'>
        <SearchIcon />

      </button>
    </div>

 

<Link to={'/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 '>
<MenuIcon />
    <AccountCircleIcon/>
</Link>
</header>
  )
}

export default Header