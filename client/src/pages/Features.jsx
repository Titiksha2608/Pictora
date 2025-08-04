import React from 'react';
import {motion} from 'framer-motion';


const Features = () => {
  return (
    <motion.div initial={{}}
        transition={{duration:1}}
        whileInView={{opacity:1, y:0}}
        viewport={{once:true}} className='bg-white min-h-[50vh] text-center pt-10 '>

        <h1 className='text-center text-3xl font-medium mb-12 sm:mb-6'>Features are on the way..Stay Tuned</h1>
        <br />
        <h1 className='text-center text-3xl font-medium mb-12 sm:mb-6'>Coming Soon</h1>
      
    </motion.div>
  )
}

export default Features;
