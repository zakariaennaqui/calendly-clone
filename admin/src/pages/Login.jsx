import React, { useContext, useState, } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ServiceContext } from '../context/ServiceContext'

const Login = () => {

    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAToken, backendUrl} = useContext(AdminContext)

    const {setSToken} = useContext(ServiceContext)

    const onSubmitHandler = async (event) => {

    event.preventDefault()

    try {
        if (state === 'Admin') {
            const {data} = await axios.post(backendUrl + '/api/admin/login' , {email, password})
            if (data.success) {
            localStorage.setItem('aToken', data.token)
            setAToken(data.token)
            } else {
              toast.error(data.message)
            }
        } else {
          const {data} = await axios.post(backendUrl + '/api/service/login' , {email, password})
          if (data.success) {
            localStorage.setItem('sToken', data.token)
            setSToken(data.token)
            console.log(data.token)
            } else {
              toast.error(data.message)
            }
        }
    } catch (error) {
        
    }

    }


  return (
    <form onSubmit={onSubmitHandler} className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-96'>
        <p className=''><span className=''>{state}</span> Login</p>
        <div className='w-full'>
            <p>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='' type="email" required />
        </div>
        <div className='w-full'>
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='' type="password" required />
        </div>
        <button type='submit' className='text-blue-500'>Login</button>
        {
            state === 'Admin'
            ?<p>service Login <span className='text-blue-500' onClick={() => setState('Service')}>click here</span></p>
            :<p>Admin Login <span className='text-blue-500' onClick={() => setState('Admin')}>click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
