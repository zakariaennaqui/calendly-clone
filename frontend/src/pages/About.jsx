import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center text-center mt-10 mb-10'>
        <p>about <span className=''>us</span></p>
      </div>

      <div className='flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-8 bg-gray-100 rounded-lg shadow-lg'>
        <img className='' src={assets.about_image} alt="" />
        <div className='flex flex-col items-start justify-center gap-4'>
          <p>welcome to Experlik, your trusted partner appointments. Our platform connects you with top-rated servives and specialists, making it easy to book appointments online.</p>
          <p>At Experlik, we ...</p>
          <b className=''>our vision</b>
          <p>We are committed to providing a seamless experience, from booking your appointment to receiving reminders and follow-ups. Our goal is to empower you to take control of ...</p>
        </div>
      </div>

      <div>
        <p>why <span className=''>choose us</span></p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 sm:p-8 bg-gray-100 rounded-lg shadow-lg'>
        <div className='flex flex-col items-start justify-center gap-2'>
          <b>Efficacité :</b>
          <p>Planification simplifiée des rendez-vous qui s'adapte à votre style de vie trépidant.</p>
        </div>
        <div className='flex flex-col items-start justify-center gap-2'>
          <b>Commodité :</b>
          <p>Accès à un réseau de professionnels de confiance dans votre région.</p>
        </div>
        <div className='flex flex-col items-start justify-center gap-2'>
          <b>Personnalisation :</b>
          <p>Recommandations et rappels personnalisés pour vous aider à prendre ...</p>
        </div>
      </div>
    </div>
  )
}

export default About
