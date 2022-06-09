import React from 'react'
import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.section className='Contact' initial={{width: 0}} animate={{width: '100vw'}} exit={{x:window.innerHeight, transition: {duration: 0.15}}}>
    <div className='Contact__box'>
      <h1>Contact</h1>
    </div>
  </motion.section>
  )
}

export default Contact