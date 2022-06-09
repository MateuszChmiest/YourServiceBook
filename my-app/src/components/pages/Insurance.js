import React from 'react';
import { motion } from "framer-motion";

function Insurance() {
  return (
    <motion.section className='Insurance' initial={{scaleY:0}} animate={{scaleY:1}} exit={{scaleY:0}}>
    <div className='Insurance__box'>
      <h1>Insurance</h1>
    </div>
  </motion.section>
  )
}

export default Insurance