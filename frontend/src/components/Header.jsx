import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex justify-between items-center bg-[#F2F2F2] p-4 rounded-lg shadow-md'>
        {/* left side */}
        <div className='flex flex-col gap-4'>
            <p className=''>book appointment <br />with trusted services</p>
            <div className='flex items-center gap-4'>
                <img className='w-28' src={assets.group_profiles} alt="" />
                <p>Simply browse through our extensive list of trusted services, <br className='hidden sm:block' /> schedule your appointment hassle-free</p>
            </div>
            <a className='text-blue-500' href="#speciality">book appointment <img className='w-3' src={assets.arrow_icon} alt="" /></a>
        </div>

        {/* right side */}
        <div className='flex justify-center items-center'>
            <img className='' src={assets.header_img} alt="" />

        </div>
    </div>
  )
}

export default Header
