import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'


const Layout = () => {
  return (
    <div
    className="min-h-screen flex flex-col relative"
     
    >
        <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <Outlet />
    </div>
  )
}

export default Layout
