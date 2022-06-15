import React from 'react'
import { motion } from "framer-motion";
import contactImg from "../../images/contact-img.png"

function Contact() {
  return (
    <motion.section className='Contact' initial={{scaleY:0}} animate={{scaleY:1}} exit={{scaleY:0}}>
    <div className='Contact__box'>
      <div className='Contact__info'>
        <h1>Any Questions?</h1>
      </div>
      <div className='Contact__img'>
        <img src={contactImg}/>
      </div>
    </div>
  </motion.section>
  )
}

export default Contact