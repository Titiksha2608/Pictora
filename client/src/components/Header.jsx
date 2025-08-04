import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const {user, setShowLogin, theme, toggleTheme} = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () =>{
    if(user){
      navigate('/result')
    }else{
      setShowLogin(true)
    }
  }

  return (
    <motion.div 
      className="w-full left-1/2 -translate-x-1/2 relative flex flex-col justify-center items-center text-center pt-10 pb-0 px-2 transition-colors duration-500 bg-white/80 backdrop-blur-sm text-gray-900 rounded-3xl mx-4 shadow-xl border border-white/20"
      style={{position: 'relative'}} // ensure relative positioning for absolute children
      initial={{opacity:1, y:0}} 
      transition={{duration:0.5}} 
      whileInView={{opacity:1, y:0}} 
      viewport={{once:true}}
    >
      

      <motion.div className="text-yellow-600 inline-flex text-center gap-1 bg-yellow-100 px-7 py-1 rounded-full border border-yellow-200" initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} transition={{delay:0.2, duration:0.8}}>
          <p>Best Text to image generator</p>
          <img src={assets.star_icon} alt="" />
      </motion.div>

      <motion.h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center text-gray-900">Turn text to <span className="text-blue-600" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4, duration:2}}>image</span>, in seconds</motion.h1>

      <motion.p className="text-center max-w-xl mx-auto mt-5 text-gray-600" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.6, duration:0.8}}>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen</motion.p>

      <motion.button onClick={onClickHandler} className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer" whileHover={{scale:1.05}} whileTap={{scale:0.95}} initial={{opacity:0}} animate={{opacity:1}} transition={{default:{duration:0.5}, opacity:{delay:0.8, duration:1}}}>Generate Images
          <img className="h-6" src={assets.star_group} alt="" />
      </motion.button>
      
      <motion.div
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{delay:1, duration:1}}
       className="flex flex-wrap justify-center mt-16 gap-3">
          {Array(6).fill('').map((items, index)=>(
              <motion.img 
              whileHover={index === 0 ? {scale: 1.1, rotate: 5} :
                         index === 1 ? {scale: 1.05, y: -10} :
                         index === 2 ? {scale: 1.08, rotate: -5} :
                         index === 3 ? {scale: 1.06, y: 5} :
                         index === 4 ? {scale: 1.12, rotate: 10} :
                         {scale: 1.04, y: -5}}
              transition={{duration: 0.3, ease: "easeInOut"}}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10" 
                  src={index === 0 ? assets.unicorn : 
                       index === 1 ? assets.bearbaking : 
                       index === 2 ? assets.panda : 
                       index === 3 ? assets.dogbaking : 
                       index === 4 ? assets.unicorndrawing : 
                       assets.robot} alt="" key={index} width={60}/>
              ))}
      </motion.div>
      
      <motion.p
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:1.2, duration:0.8}}
       className="mt-2 mb-23 text-gray-600">Generated images from imagify</motion.p>

    </motion.div>
  )
}

export default Header
