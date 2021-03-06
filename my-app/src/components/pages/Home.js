import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import homeImg from '../../images/car-home.png'
import { motion } from "framer-motion";

function Home() {

  const navigate = useNavigate();

  return (
    <motion.section className='Home' initial={{scaleY:0}} animate={{scaleY:1}} exit={{scaleY:0}}>
      <div className='Home__box'>
        <div className='Home__text'>
          <h1>Welcome in <br/>Your <span>Service</span> Book</h1>
          <h2>an application where you can keep<br/> the most important information about your car!</h2>
          <Button variant="primary" size="lg" id="Home__btn" onClick={() => navigate("/my-cars")}>GET STARTED!</Button>
        </div>
        <div className='Home__img'>
          <img src={homeImg} alt="home-image"/>
        </div>
      </div>
    </motion.section>
  )
}

export default Home;