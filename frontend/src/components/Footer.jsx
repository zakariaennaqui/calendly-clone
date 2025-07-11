import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-white text-gray-800 p-4 sm:p-8 mt-10'>
      <div className='flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8'>
        {/* left section */}
        <div>
            <img className='' src={assets.logo} alt="" />
            <p className=''>...</p>
        </div>
        {/* centre section */}
        <div>
            <p className=''>company</p>
            <ul className='list-none'>
                <li>home</li>
                <li>about us</li>
                <li>contact us</li>
                <li>privacy policy</li>
            </ul>
        </div>
        {/* right section */}
        <div>
            <p className=''>get in touch</p>
            <ul className='list-none'>
                <li>+212-XXX-XXX-XXX</li>
                <li>Experlik@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        {/* copyright text */}
        <hr />
        <p className='text-center text-gray-500'>© 2025 Experlik. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
