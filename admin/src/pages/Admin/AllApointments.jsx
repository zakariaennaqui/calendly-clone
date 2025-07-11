import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllApointments = () => {

  const {aToken, appointments, getAllAppointments, cancelAppointment} = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency} = useContext(AppContext)

  useEffect(()=>{
    if (aToken) {
      getAllAppointments()
    }
  },[aToken])

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <p className='text-2xl font-bold text-gray-800 mb-6'>All Appointments</p>
      <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
        <div className='grid grid-cols-7 gap-4 bg-gray-200 text-gray-700 font-semibold text-sm p-4'>
          <p>#</p>
          <p>client</p>
          <p>age</p>
          <p>date & time</p>
          <p>service</p>
          <p>fees</p>
          <p>actions</p>
        </div>

        {appointments.map((item,index)=>(
          <div className='grid grid-cols-7 gap-4 items-center border-b p-4 text-sm' key={index}>
            <p className='text-center font-medium text-gray-700'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
            </div>
            <p className=''>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover' src={item.docData.image} alt="" /><p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {
              item.cancelled
              ? <p className='text-red-500'>Cancelled</p>
              : item.isCompleted
                ? <p className='text-green-500'>Completed</p> 
                : <img onClick={()=>cancelAppointment(item._id)} className='' src={assets.cancel_icon} alt="" />
            }

          </div>
        ))}

      </div>
    </div>
  )
}

export default AllApointments
