import React, { useContext } from 'react'
import { ServiceContext } from '../../context/ServiceContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ServiceProfile = () => {

  const {sToken, profileData, setProfileData, getProfileData, backendUrl} = useContext(ServiceContext)
  const {currency} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  
  const updateProfile = async () => {
    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available:profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/service/update-profile',updateData, { headers: { sToken } });
      if (data.success) {
                  toast.success(data.message)
                  setIsEdit(false)
                  getProfileData()
              } else {
                  toast.error(data.message)
              }
          } catch (error) {
              console.log(error)
              toast.error(error.message)
          }
  }

  useEffect(()=>{
    if (sToken) {
      getProfileData()
    }
  }, [sToken])

  return profileData && (
    <div>
      <div className=''>
        <div>
          <img className='' src={profileData.image} alt="" />
        </div>

        <div className=''>
          {/*  */}
          <p className=''>{profileData.name}</p>
          <div className=''>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='text-gray-600'>{profileData.experience}</button>
          </div>
          {/*  */}
          <div>
            <p className=''>about:</p>
            <p className=''>{profileData.about}</p>
          </div>
          <p className=''>
            appointment fee: <span className=''>{currency} {isEdit ? <input type="number" onChange={(e)=>setProfileData(prev=>({...prev, fees: e.target.value}))} value={profileData.fees} /> : profileData.fees}</span>
          </p>
          <div className=''>
            <p>address:</p>
            <p className=''>
              {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev, address: {...prev.address,line1:e.target.value}}))} value={profileData.address.line1} /> : profileData.address.line1}
              <br />
              {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev=>({...prev, address: {...prev.address,line2:e.target.value}}))} value={profileData.address.line2} /> : profileData.address.line2}
            </p>
          </div>
          <div className=''>
            <input onChange={()=> isEdit && setProfileData(prev=>({...prev, available: !prev.available}))} value={profileData.address.line1} checked={profileData.available} type="checkbox"/>
            <label htmlFor="">available</label>
          </div>

          {
            isEdit
            ? <button onClick={updateProfile} className='text-blue-500'>save</button>
            : <button onClick={()=>setIsEdit(true)} className='text-blue-500'>edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default ServiceProfile
