import React from 'react';
import { motion } from "framer-motion";

function Insurance() {
  return (
    <motion.section className='Insurance' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
    <div className='Insurance__box'>
      <h1>Insurance</h1>
    </div>
  </motion.section>
  )
}

export default Insurance