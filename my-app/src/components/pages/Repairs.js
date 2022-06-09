import React from 'react';
import { motion } from "framer-motion"

function Repairs() {
  return (
    <motion.section className='Repairs' initial={{scaleY:0}} animate={{scaleY:1}} exit={{scaleY:0}}>
    <div className='Repairs__box'>
      <h1>Repairs</h1>
    </div>
  </motion.section>
  )
}

export default Repairs