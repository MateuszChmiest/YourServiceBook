import React from 'react'
import { motion } from "framer-motion";
import contactImg from "../../images/contact-img.png";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { AiFillFacebook, AiOutlineTwitter, AiFillInstagram, AiFillYoutube } from "react-icons/ai"

function Contact() {
  return (
    <motion.section className='Contact' initial={{scaleY:0}} animate={{scaleY:1}} exit={{scaleY:0}}>
    <div className='Contact__box'>
      <div className='Contact__text'>
        <div className='Contact__title'>
        <h1>Any Questions?</h1>
        <h2>Contact Us!</h2>
        </div>
        <div className='Contact__info'>
          <a href='tel: 123456789'><BsFillTelephoneFill/> <span>123 456 789</span></a>
          <a href='mailto: info@yourservicebook.pl'><GrMail/> <span>info@yourservicebook.pl</span></a>
        </div>
        <div className='Contact__social'>
          <a href='#'><AiFillFacebook/></a>
          <a href='#'><AiOutlineTwitter/></a>
          <a href='#'><AiFillInstagram/></a>
          <a href='#'><AiFillYoutube/></a>
        </div>
      </div>
      <div className='Contact__img'>
        <img src={contactImg}/>
      </div>
    </div>
  </motion.section>
  )
}

export default Contact