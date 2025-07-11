import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { ServiceContext } from '../context/ServiceContext'

const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext)
    const {sToken, setSToken} = useContext(ServiceContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        sToken && setSToken('')
        sToken && localStorage.removeItem('sToken')
    }

  return (
    <div className='flex items-center justify-between p-4 bg-white shadow-md'>
      <div className='flex items-center gap-4'>
        <img className='h-10 w-auto' src={assets.admin_logo} alt="" />
        <p className='text-lg font-semibold text-gray-700'>{aToken ? 'Admin' : 'Service'}</p>
      </div>
      <button onClick={logout} className='text-sm text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition'>logout</button>
    </div>
  )
}

export default Navbar
