import React from 'react';
import { motion } from "framer-motion";

function Insurance() {
  return (
    <motion.section className='Insurance' initial={{width: 0}} animate={{width: '100vw'}} exit={{x:window.innerHeight, transition: {duration: 0.15}}}>
    <div className='Insurance__box'>
      <h1>Insurance</h1>
    </div>
  </motion.section>
  )
}

export default Insurance