import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedServices = ({speciality, docId}) => {

    const {services} =useContext(AppContext)
    const navigate = useNavigate()

    const[relDoc, setRelDocs] = useState([])

    useEffect(()=> {
        if (services.length > 0 && speciality) {
            const servicesData = services.filter(doc => doc.speciality === speciality && doc._id !== docId)
            setRelDocs(servicesData)
        }

    },[services, speciality, docId])

  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className=''>top services to book</h1>
      <p className=''>Simply browse through our extensive list of trusted services.</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4'>
        {
            relDoc.slice(0, 5).map((item, index) => (
              <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='flex flex-col items-center'>
                <img src={item.image} alt={item.name} className='w-24 h-24 rounded-full' />
                <div className='text-center mt-2'>
                    <div className={`flex items-center justify-center bg-green-100 ${item.available ? 'text-green-800' : 'bg-gray-500'} text-xs font-semibold px-2 py-1 rounded-full`}>
                        <p className={`${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                    </div>
                    <p className=''>{item.name}</p>
                    <p className=''>{item.speciality}</p>
                </div>
              </div>
            ))
        }
      </div>
      <button onClick={()=>{navigate('/services'); scrollTo(0,0)}} className='text-blue-500'>more</button>
    </div>
  )
}

export default RelatedServices
