import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const MyAppointments = () => {

  const {backendUrl, token, getServicesData} = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_")
    return dateArray[0]+ " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const navigate = useNavigate()

  const getUserAppointments = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  const cancelAppointment = async (appointmentId) => {

    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token }})
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getServicesData()
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  const initPay = (order) => {

    const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: order.currency,
  name: 'Appointment Payment',
  description: 'Appointment Payment',
  order_id: order.id,
  receipt: order.receipt,
  handler: async (response) => {
    console.log(response)

    try {

      const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response , { headers: { token }})
      if (data.success) {
        getUserAppointments()
        navigate('/my-appointments')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }
}

    const rzp = new window.Razorpay(options)
    rzp.open()

  }

  const appointmentRazorpay = async (appointmentId) => {
    
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token }})
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      
    }

  }

  const appointmentStripe = async (appointmentId) => {
  try {
    const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, {
      headers: { token }
    })

    if (data.success) {
      window.location.replace(data.session_url)
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

  useEffect(()=>{
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className=''>My Appointments</p>
      <div>
        {
          appointments.map((item, index) =>
          (
            <div key={index} className="flex items-center gap-4 p-4 border-b">
              <div>
              <img src={item.docData.image} alt="" className="w-16 h-16 rounded-full" />
              </div>
              <div className='flex-1'>
                <p className="text-lg font-semibold">{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className=''>address:</p>
                <p className=''>{item.docData.address.line1}</p>
                <p className=''>{item.docData.address.line2}</p>
                <p className="text-sm text-gray-500"> <span className='text-sm text-gray-500'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
                <div className='flex flex-col items-center gap-2'>
                  {!item.cancelled && item.payment && !item.isCompleted && <button className=''>paid</button>}
                  {/*{!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>appointmentRazorpay(item._id)} className='text-blue-500'>pay online</button>}*/}
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <>
                    <button onClick={() => appointmentRazorpay(item._id)} className='text-blue-500'>Pay with Razorpay</button>
                    <button onClick={() => appointmentStripe(item._id)} className='text-purple-500'>Pay with Stripe</button>
                    </>
                  )}
                  {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-red-500'>cancel appointment</button>}
                  {item.cancelled && !item.isCompleted && <button className=''>appointment cancelled</button>}
                  {item.isCompleted && <button className=''>Completed</button>}
                </div>
            </div>
          )
        )
        }
      </div>
    </div>
  )
}

export default MyAppointments
