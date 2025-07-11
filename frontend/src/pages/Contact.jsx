import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center text-center mt-10 mb-10'>
        <p>contact <span className=''>us</span></p>
      </div>

      <div className='flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-8 bg-gray-100 rounded-lg shadow-lg'>
        <img className='' src={assets.contact_image} alt="" />

        <div className='flex flex-col items-start justify-center gap-4'>
          <p className=''>our office</p>
          <p className=''>address... <br />...</p>
          <p className=''>tel: (212) XXX-XXXX <br />email: ...</p>
          <p className=''>careers at Experlik</p>
          <p className=''>descrip</p>
          <button className='text-blue-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
