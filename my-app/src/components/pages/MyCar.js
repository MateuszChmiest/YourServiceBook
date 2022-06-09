import React from 'react';
import { motion } from "framer-motion";

function MyCar() {
  return (
    <motion.section className='My_car' initial={{width: 0}} animate={{width: '100vw'}} exit={{x:window.innerHeight, transition: {duration: 0.15}}}>
    <div className='My_car__box'>
      <h1>My Car</h1>
    </div>
  </motion.section>
  )
}

export default MyCar