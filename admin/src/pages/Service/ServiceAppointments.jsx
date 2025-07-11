import React, { useContext, useEffect } from 'react'
import { ServiceContext } from '../../context/ServiceContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const ServiceAppointments = () => {
  const { sToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(ServiceContext)

  const {calculateAge, slotDateFormat, currency} = useContext(AppContext)

  useEffect(() => {
    if (sToken) {
      getAppointments()
    }
  }, [sToken])

  return (
    <div className='p-6'>
      <p className='text-2xl font-bold text-gray-800 mb-6'>all appointments</p>
      <div className='bg-white rounded-lg shadow overflow-x-auto'>
        <div className='grid grid-cols-7 gap-4 bg-gray-200 text-gray-700 font-semibold text-sm p-4'>
          <p>#</p>
          <p>client</p>
          <p>payment</p>
          <p>age</p>
          <p>date & time</p>
          <p>fees</p>
          <p>actions</p>
        </div>

        {
  appointments.reverse().map((item, index) => (
    <div className='grid grid-cols-7 gap-4 items-center border-b p-4 text-sm' key={index}>
        <p className='text-center font-medium text-gray-700'>{index + 1}</p>
      <div className='flex items-center gap-2'>
        <img className='w-8 h-8 rounded-full object-cover' src={item.userData.image} alt="" />
        <p>{item.userData.name}</p>
      </div>
      <div>
        <p className=''>
          {item.payment ? 'Online' : 'CASH'}
        </p>
      </div>
      <p className='text-gray-700'>{calculateAge(item.userData.dob)}</p>
      <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
      <p>{currency}{item.amount}</p>
      {
        item.cancelled
        ? <p className='text-red-600'>Cancelled</p>
        : item.isCompleted
          ?<p className='text-green-600'>Completed</p>
          : <div className='flex gap-3'>
        <img onClick={()=>cancelAppointment(item._id)} className='w-6 h-6 cursor-pointer' src={assets.cancel_icon} alt="" />
        <img onClick={()=>completeAppointment(item._id)} className='w-6 h-6 cursor-pointer' src={assets.tick_icon} alt="" />
      </div>
      }
    </div>
  ))
}


      </div>
    </div>
  )
}

export default ServiceAppointments