import React, { useContext } from 'react'
import {assets, plans} from '../assets/assets'
import { AppContext } from '../context/AppContext'
import {motion} from 'framer-motion'

const BuyCredit = () => {

  const  {user} = useContext(AppContext)

  return (
    <motion.div
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    className='min-h-[80vh] text-center bg-white pt-14 pb-9 '>
      <motion.button 
        className='border border-gray-200 text-gray-900 px-10 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-300'
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Our Plans Coming Soon
      </motion.button>
      <h1 className='text-center text-3xl font-medium mt-8 mb-12 sm:mb-6'>We're Crafting Magic..Stay Tuned!</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index)=>(
          <div key={index} className='bg-white drop-shadow-sm border border-gray-200 rounded-lg py-12 px-8 text-gray-900 hover:scale-105 transistion-all duration-500'>
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>${item.price} </span> / {item.credits} Credits</p>
              <button className='w-full bg-white-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>{user ?'Coming Soon': 'Coming Soon'}</button>
          </div>
        ))}
      </div>

    </motion.div>
  )
}

export default BuyCredit
