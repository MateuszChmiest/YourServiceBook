import React from 'react'
import { AiFillHome, AiFillCar } from "react-icons/ai";
import { MdCarRental } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { BsFillTelephoneFill, BsShieldCheck } from "react-icons/bs";


export const HeroData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiFillHome/>,
        cName: 'Hero__text',
    },
    {
        title: 'My Cars',
        path: '/my-cars',
        icon: <AiFillCar/>,
        cName: 'Hero__text',
    },
    {
        title: 'Exploitation',
        path: '/exploitation',
        icon: <MdCarRental/>,
        cName: 'Hero__text',
    },
    {
        title: 'Repairs',
        path: '/repairs',
        icon: <GiAutoRepair/>,
        cName: 'Hero__text',
    },
    {
        title: 'Insurance',
        path: '/insurance',
        icon: <BsShieldCheck/>,
        cName: 'Hero__text',
    },
    {
        title: 'Contact',
        path: '/contact',
        icon: <BsFillTelephoneFill/>,
        cName: 'Hero__text',
    },
]