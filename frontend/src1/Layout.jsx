import React from 'react'
import Header from './Pages/Header'
import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <div>
      
       <Outlet />
       <Header />
        </div>
  )
}

export default Layout