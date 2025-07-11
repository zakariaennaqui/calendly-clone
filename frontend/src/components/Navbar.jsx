import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const navigate = useNavigate()

    const {token, setToken, userData} = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)

    const logout = () => {
      setToken(false)
      localStorage.removeItem('token')
    }


  return (
    <div className='flex justify-between items-center bg-white p-4 shadow-md'>
      <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
      <ul className='flex gap-8 text-gray-700 font-semibold'>
        <NavLink to={'/'}>
            <li className='py-1'>HOME</li>
            <hr className='border-2 border-blue-500 w-0 hidden' />
        </NavLink>
        <NavLink to={'/services'}>
            <li className='py-1'>ALL SERVICES</li> 
            {/* services */}
            <hr className='border-2 border-blue-500 w-0 hidden' />
        </NavLink>
        <NavLink to={'/about'}>
            <li className='py-1'>ABOUT</li>
            <hr className='border-2 border-blue-500 w-0 hidden' />
        </NavLink>
        <NavLink to={'/contact'}>
            <li className='py-1'>CONTACT</li>
            <hr className='border-2 border-blue-500 w-0 hidden' />
        </NavLink>
      </ul>
      <div className='flex gap-4'>
        {
            token && userData
            ? <div className='flex items-center gap-2 cursor-pointer relative' onClick={()=>setShowMenu(!showMenu)}>
                <img className=' w-8 rounded-full' src={userData.image} alt="" />
                <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                <div className='absolute top-10 right-0 bg-white shadow-md rounded-md p-4 z-10 hidden group-hover:block' style={{display: showMenu ? 'block' : 'none'}}>
                    <div className='flex flex-col gap-2 text-gray-700 font-semibold'>
                        <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={()=>navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            :<button onClick={()=>navigate('/login')} className='bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300'>CREATE ACOUNT</button>
        }
        <img onClick={()=>setShowMenu(true)} className='' src={assets.menu_icon} alt="" />
        {/* mobile menu */}
        <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex justify-between items-center p-4 border-b'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col gap-4 p-4 text-gray-700 font-semibold'>
            <NavLink onClick={()=>setShowMenu(false)} to={'/'}>
              <li> <p className='py-1'>HOME</p></li>
            </NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to={'/services'}>
              <li> <p className='py-1'>ALL SERVICES</p></li>
            </NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to={'/about'}>
              <li> <p className='py-1'>ABOUT</p></li>
            </NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to={'/contact'}>
              <li> <p className='py-1'>CONTACT</p></li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
