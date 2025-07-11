import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='' id='speciality'>
      <h1 className=''>find by speciality</h1>
      <p className=''>Simply browse through our extensive list of trusted services, schedule your appointment hassle-free</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4'>
        {
            specialityData.map((item, index) => (
                <Link onClick={()=>scrollTo(0,0)} className='' key={index} to={`/services/${item.speciality}`}>
                    <img className='' src={item.image} alt="" />
                    <p>{item.speciality}</p>
                    </Link>
            ))
        }
      </div>
    </div>
  )
}

export default SpecialityMenu
