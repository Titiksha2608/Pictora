import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen w-full flex flex-col items-center justify-center "
    >
      <Header />
      <div className="w-full flex flex-col mb-0">
        <section className="rounded-none shadow-none bg-white backdrop-blur-md w-full px-0 py-1 sm:py-12 transition-colors duration-500">
          <Steps />
        </section>
        <section className="rounded-none bg-white backdrop-blur-md w-full px-0 py-8 sm:py-12 transition-colors duration-500">
          <Description />
        </section>
        <section className="rounded-none shadow-none bg-white backdrop-blur-md w-full px-0 py-0 sm:py-12 transition-colors duration-500">
          <Testimonials />
        </section>
        <section className="rounded-none shadow-none bg-white backdrop-blur-md w-full px-0 py-8 sm:py-12 transition-colors duration-500 flex flex-col items-center">
          <GenerateBtn />
        </section>
      </div>
    </motion.div>
  )
}

export default Home
