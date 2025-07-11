import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-6 sm:p-10 rounded-2xl shadow-xl'>
      {/* left side */}
      <div className='flex flex-col items-center sm:items-start text-center sm:text-left space-y-4'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-lg font-medium text-gray-700'>
        <p>book appointment</p>
        <p className=''>with 100+ trusted services</p>
      </div>
      <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='text-white bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-md text-sm font-semibold'>create account</button>
      </div>

      {/* right side */}
      <div className='flex items-center justify-center mt-6 sm:mt-0 sm:ml-6'>
        <img className='w-48 sm:w-64 object-contain' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner
