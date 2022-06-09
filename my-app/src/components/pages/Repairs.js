import React from 'react';
import { motion } from "framer-motion"

function Repairs() {
  return (
    <motion.section className='Repairs' initial={{width: 0, opacity:0}} animate={{width: '100vw', opacity:1}} exit={{x:window.innerHeight, opacity:0,transition: {duration: 0.15}}}>
    <div className='Repairs__box'>
      <h1>Repairs</h1>
    </div>
  </motion.section>
  )
}

export default Repairs