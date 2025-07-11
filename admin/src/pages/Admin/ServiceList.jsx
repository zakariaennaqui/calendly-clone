import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const ServiceList = () => {

  const {services, aToken, getAllServices, changeAvailability} = useContext(AdminContext)

  useEffect(()=>{
    if (aToken) {
      getAllServices()
    }
  }, [aToken])

  return (
    <div className=''>
      <h1 className=''>all services</h1>
      <div className=''>
        {
          services.map((item,index)=>(
            <div className='' key={index}>
              <img className='' src={item.image} alt="" />
              <div className='p-4'>
                <p className=''>{item.name}</p>
                <p className=''>{item.speciality}</p>
                <div className=''>
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available}/>
                  <p>available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ServiceList
