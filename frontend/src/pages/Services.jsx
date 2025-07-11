import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Services = () => {

  const {speciality} = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const {services} = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(services.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(services)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [services, speciality])

  return (
    <div>
      <p className=''>browse through the services</p>
      <div className='flex flex-col items-center mt-10'>
        <button className={`${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>filters</button>
        <div className={`flex-col items-center ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=>speciality === 'General physician' ? navigate('/services') : navigate('/services/General physician') } className={`text-blue-500 ${speciality === "General physician" ? "bg-indigo-100 text-black" : "" } `} >General physician</p>
          <p onClick={()=>speciality === 'Gynecologist' ? navigate('/services') : navigate('/services/Gynecologist') } className={`text-blue-500 ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : "" } `} >Gynecologist</p>
          <p onClick={()=>speciality === 'Dermatologist' ? navigate('/services') : navigate('/services/Dermatologist') } className={`text-blue-500 ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : "" } `} >Dermatologist</p>
          <p onClick={()=>speciality === 'Pediatricians' ? navigate('/services') : navigate('/services/Pediatricians') } className={`text-blue-500 ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : "" } `} >Pediatricians</p>
          <p onClick={()=>speciality === 'Neurologist' ? navigate('/services') : navigate('/services/Neurologist') } className={`text-blue-500 ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : "" } `} >Neurologist</p>
          <p onClick={()=>speciality === 'Gastroenterologist' ? navigate('/services') : navigate('/services/Gastroenterologist') } className={`text-blue-500 ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : "" } `} >Gastroenterologist</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4'>
          {
            filterDoc.map((item, index) => (
              <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className='flex flex-col items-center'>
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
      </div>
    </div>
  )
}

export default Services
