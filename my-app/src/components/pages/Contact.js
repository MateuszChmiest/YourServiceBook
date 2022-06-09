import React from 'react'
import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.section className='Contact' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
    <div className='Contact__box'>
      <h1>Contact</h1>
    </div>
  </motion.section>
  )
}

export default Contact