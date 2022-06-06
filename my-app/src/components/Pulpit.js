import React from "react";
import { Button } from "react-bootstrap";
import logo from "../images/logo.png";
import Hero from "./Hero";

const Pulpit = ({ handleLogout, currentUser }) => {
	return (
		<>
			<section className='Pulpit'>
				<nav className='Pulpit__nav'>
					<img src={logo} />
					<h2>Welcome {currentUser.email}</h2>
					<Button variant='primary' onClick={handleLogout}>
						Logout
					</Button>
				</nav>
			</section>
            <Hero/>
		</>
	);
};

export default Pulpit;
