import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ServiceContext } from '../context/ServiceContext'

const Sidebar = () => {

  const {aToken} = useContext(AdminContext)
  const {sToken} = useContext(ServiceContext)

  return (
    <div className=''>
      {
        aToken && <ul className=''>
          <NavLink className={({isActive})=>`flex ${isActive ? '' : ''}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className=''>dashboard</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex ${isActive ? '' : ''}`} to={'/all-appointments'}>
            <img src={assets.appointment_icon} alt="" />
            <p className=''>appointments</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex ${isActive ? '' : ''}`} to={'/add-service'}>
            <img src={assets.add_icon} alt="" />
            <p className=''>add service</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex ${isActive ? '' : ''}`} to={'/service-list'}>
            <img src={assets.people_icon} alt="" />
            <p className=''>services list</p>
          </NavLink>
        </ul>
      }
      {
        sToken && <ul className=''>
          <NavLink className={({isActive})=>`flex ${isActive ? '' : ''}`} to={'/service-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className=''>dashboard</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex ${isActive ? '' : ''}`} to={'/service-appointments'}>
            <img src={assets.appointment_icon} alt="" />
            <p className=''>appointments</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex ${isActive ? '' : ''}`} to={'/service-profile'}>
            <img src={assets.people_icon} alt="" />
            <p className=''>profile</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
