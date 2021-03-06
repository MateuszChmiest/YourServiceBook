import React, {useState} from "react";
import { Button } from "react-bootstrap";
import logo from "../images/logo-white.png";
import userImg from "../images/user.png"
import { FaBars, FaRegWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HeroData } from "./HeroData";
import { IconContext } from "react-icons";
import Calendar from "./Calendar";

const Hero = ({ handleLogout, currentUser }) => {

	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar)

	return (
		<>
		<IconContext.Provider value={{color: 'white'}}>
			<div className='Hero'>
				<Link to='#' className='Hero__bars'>
					<FaBars onClick={showSidebar}/>
				</Link>
				<img src={logo} alt="logo"/>
				<Calendar/>
			</div>
			<nav className={sidebar ? "Hero__nav active" : "Hero__nav"}>
				<ul className='Hero__nav__items' onClick={showSidebar}>
					<li className='Hero__toggle'>
						<Link to='#' className='Hero__bars'>
							<FaRegWindowClose />
						</Link>
					</li>
					{HeroData.map((item,index) => {
						return (
						<li key={index} className={item.cName}>
							<Link to={item.path}>
								{item.icon}
								<span>{item.title}</span>
							</Link>
						</li>
						)
					})}
				</ul>
				<div className='Hero__user'>
					<img src={userImg} alt="user"/>
				<h2>
					<span>Welcome: </span><br/>
					{currentUser.email}
				</h2>
				<Button
					variant='primary'
					onClick={handleLogout}
					className='Pulpit__btn'>
					Logout
				</Button>
			</div>
			</nav>
			</IconContext.Provider>
		</>
	);
};

export default Hero;
