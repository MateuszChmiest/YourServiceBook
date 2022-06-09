import React from 'react';
import { motion } from "framer-motion";

function MyCar() {
  return (
    <motion.section className='My_car' initial={{scaleY:0}} animate={{scaleY:1}} exit={{scaleY:0}}>
    <div className='My_car__box'>
      <h1>My Car</h1>
    </div>
  </motion.section>
  )
}

export default MyCar