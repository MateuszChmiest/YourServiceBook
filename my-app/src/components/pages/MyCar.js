import React from 'react';
import { motion } from "framer-motion";

function MyCar() {
  return (
    <motion.section className='My_car' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
    <div className='My_car__box'>
      <h1>My Car</h1>
    </div>
  </motion.section>
  )
}

export default MyCar