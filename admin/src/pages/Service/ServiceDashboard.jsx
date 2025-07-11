import React from 'react'
import { useContext } from 'react'
import { ServiceContext } from '../../context/ServiceContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const ServiceDashboard = () => {

  const {sToken, getDashData, dashData, setDashData, completeAppointment, cancelAppointment} = useContext(ServiceContext)
  const {currency, slotDateFormat} = useContext(AppContext)

  useEffect(()=>{
    if (sToken) {
      getDashData()
    }
  }, [sToken])

  return dashData && (
    <div className='m-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='flex items-center gap-4 bg-white p-4 rounded-lg shadow'>
          <img className='w-10 h-10' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-bold text-gray-800'>{currency} {dashData.earnings}</p>
            <p className='text-sm text-gray-500'>earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 rounded-lg shadow'>
          <img className='w-10 h-10' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-bold text-gray-800'>{dashData.appointments}</p>
            <p className='text-sm text-gray-500'>appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 rounded-lg shadow'>
          <img className='w-10 h-10' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-bold text-gray-800'>{dashData.patients}</p>
            <p className='text-sm text-gray-500'>clients</p>
          </div>
        </div>

      </div>

      <div className='bg-white p-6 rounded-lg shadow'>
        <div className='flex items-center gap-2 mb-4'>
          <img src={assets.list_icon} alt="" />
          <p className='text-lg font-semibold text-gray-700'>latest bookings</p>
        </div>

        <div className='space-y-4'>
          {
            dashData.latestAppointments.map((item, index)=>(
              <div className='flex items-center justify-between p-4 border rounded' key={index}>
                <img className='w-10 h-10 rounded-full object-cover' src={item.userData.image} alt="" />
                <div className='flex-1 ml-4'>
                  <p className='font-medium text-gray-800'>{item.userData.name}</p>
                  <p className='text-sm text-gray-500'>{slotDateFormat(item.slotDate)}</p>
                </div>
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
    </div>
  )
}

export default ServiceDashboard
