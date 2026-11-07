import React from 'react'
import {useState} from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png"
import { useContext } from 'react';
import codeArena from '../assets/codeArena.png';
import { ChevronsDown,ChevronsUp,User,SquarePen,ChartColumn,LogOut,Menu,X } from 'lucide-react';
import { useSelector } from "react-redux";

import {AuthContext}  from "../context/AuthProvider";

const Navbar = () => {

  const { isLoggedIn, DisplayName, loading, logout } = useContext(AuthContext);
  const [profile,setProfile]=useState(false);
  const [mobileMenu,setMobileMenu]=useState(false);
  const myProfile = useSelector((state) => state.profile.profile);
  const profileName = myProfile?.displayName || DisplayName || "your name";
  const profileUserName = myProfile?.userName || "your username";

  function Check() {
    if (profile) {
      setProfile(false);
    } else {
      setProfile(true);
    }
  }


  const navItems = [
    { name: "Home", path: "/" },
    { name: "Problems", path: "/problems" },
    { name: "Submissions", path: "/submissions" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <><div className='relative  w-full h-20 bg-black/15 backdrop-blur-md flex justify-around items-center border-b-2 border-gray-700 max-lg:justify-between max-lg:px-4'>

      <div className="logo">
        <img className='h-16 w-56 max-lg:h-12 max-lg:w-auto max-lg:max-w-40 max-sm:max-w-28' src={Logo} alt="" />
      </div>

      <div className="navigation max-lg:hidden">

        <nav className="flex gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative py-4 text-gray-400 font-Saira text-xl"
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? "text-white" : ""}>
                    {item.name}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

      </div>

      <div className="login profile p-3 max-lg:p-0">
        {!loading && (
          isLoggedIn ? (
            <button
              onClick={() => Check()}
              className="h-10 w-fit items-center rounded-lg bg-violet-500/20 border hover:cursor-pointer transition-all hover:-translate-y-0.5 border-text px-2 py-1 flex gap-1 text-text text-sm"
            >
              <img
                className="h-6 w-6 object-cover rounded-full"
                src={myProfile?.avatar||codeArena}
                alt=""
              />
              <span className="max-sm:max-w-14 max-sm:truncate">{profileName}</span>
              {profile ? <ChevronsUp /> : <ChevronsDown />}
            </button>
          ) : (
            <NavLink to="/login" className="max-sm:hidden">
              <div className="login h-10 w-32 bg-white rounded-lg inset-shadow-sm inset-shadow-gray-900 relative">
                <motion.button
                  whileHover={{ x: 5, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bg-violet-500 h-full w-full rounded-lg font-roboto shadow-2xs cursor-pointer text-white"
                >
                  Sign up/Login
                </motion.button>
              </div>
            </NavLink>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => setMobileMenu((open) => !open)}
        className="hidden max-lg:flex items-center justify-center rounded-lg border border-border bg-section p-2 text-text"
        aria-label={mobileMenu ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileMenu}
      >
        {mobileMenu ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {mobileMenu && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-0 right-0 top-full z-50 flex flex-col gap-1 border-b border-border bg-section/95 p-3 shadow-lg backdrop-blur-md lg:hidden"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 font-Saira text-lg ${
                    isActive ? "bg-violet-500/15 text-white" : "text-gray-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            {!isLoggedIn && (
              <NavLink
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-4 py-3 font-Saira text-lg text-violet-300"
              >
                Sign up/Login
              </NavLink>
            )}
          </motion.nav>
        )}
      </AnimatePresence>


    

      <AnimatePresence>
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}

            className="dropdown absolute w-56 h-70 bg-section/90  left-[80%]  top-24 rounded-lg border border-white flex flex-col max-lg:left-auto max-lg:right-3 max-lg:top-16 ">

            <div className="top w-full flex items-center gap-2 p-5">
              <div className="left flex  items-center h-10 w-10 rounded-full">
                <img className='h-full w-full object-cover rounded-full' src={myProfile?.avatar||codeArena} alt="" />
              </div>
              <div className="right flex flex-col gap-1">
                <h1 className='text-text text-sm'>{profileName}</h1>
                <h1 className='text-text/30 text-xs'>{profileUserName}</h1>
              </div>
            </div>
            <div className="middle w-full flex flex-col gap-3 border border-border p-2">
              <NavLink to="/profile"><button className='flex gap-3 items-center w-full h-7 text-text/70 hover:bg-violet-600/10 p-2 rounded-lg hover:cursor-pointer'>
                <User size={16} strokeWidth={1} /> Profile
              </button></NavLink>
             <NavLink to="/profile/edit">
               <button className='flex gap-3 items-center w-full h-7 text-text/70 hover:bg-violet-600/10 p-2 rounded-lg hover:cursor-pointer'>
                <SquarePen size={16} strokeWidth={1} /> Edit profile
              </button>
             </NavLink>
             <NavLink to="/submissions">
               <button className='flex gap-3 items-center w-full h-7 text-text/70 hover:bg-violet-600/10 p-2 rounded-lg hover:cursor-pointer'>
                <ChartColumn size={16} strokeWidth={1} /> Submissions
              </button>
             </NavLink>


            </div>
            <div className="bottom p-2">
              <button 
              onClick={() => {
                setProfile(false);
                logout();
              }}
              className='w-full text-red-500 items-center flex gap-3 p-2 hover:cursor-pointer hover:bg-red-500/10 rounded-lg'>
                <LogOut size={16} strokeWidth={1} /> Log out
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>




    </div>


    </>

  )
}

export default Navbar
