import React from 'react'
import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.section className='Contact' initial={{scaleY:0}} animate={{scaleY:1}} exit={{scaleY:0}}>
    <div className='Contact__box'>
      <h1>Contact</h1>
    </div>
  </motion.section>
  )
}

export default Contact