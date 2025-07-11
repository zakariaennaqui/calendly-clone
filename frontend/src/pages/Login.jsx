import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const {backendUrl, token, setToken} = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('sign up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (state === 'sign up') {
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,password,email})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(backendUrl + '/api/user/login',{password,email})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center justify-center mt-10 mb-10 gap-4'>
      <div className='flex flex-col items-center justify-center gap-4 p-4 sm:p-8 bg-gray-100 rounded-lg shadow-lg'>
        <p className=''>{state === 'sign up' ? 'create account' : 'login'}</p>
        <p>Please enter your email and password to {state === 'sign up' ? 'create an account' : 'login'}</p>
        {
          state === 'sign up' && <div className='flex items-center justify-center gap-4'>
          <p>full name</p>
          <input className='' type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>
        }
        <div className='flex items-center justify-center gap-4'>
          <p>email</p>
          <input className='' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        </div>
        <div className='flex items-center justify-center gap-4'>
          <p>password</p>
          <input className='' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
        </div>
        <button type='submit' className='text-blue-500'>{state === 'sign up' ? 'create account' : 'login'}</button>
        {
          state === 'sign up'
          ? <p className='text-blue-500 cursor-pointer' >Already have an account? <span onClick={()=>setState('login')} className=''>Login</span> </p>
          : <p className='text-blue-500 cursor-pointer' >Don't have an account? <span onClick={()=>setState('sign up')} className=''>Sign Up</span></p>
        }
      </div>
      
    </form>
  )
}

export default Login

