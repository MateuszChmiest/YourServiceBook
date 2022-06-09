import React from 'react';
import { motion } from "framer-motion"

function Repairs() {
  return (
    <motion.section className='Repairs' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
    <div className='Repairs__box'>
      <h1>Repairs</h1>
    </div>
  </motion.section>
  )
}

export default Repairs