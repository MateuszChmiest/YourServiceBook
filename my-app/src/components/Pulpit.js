import React from "react";
import { Button } from "react-bootstrap";
import logo from "../images/logo-white.png";
import Hero from "./Hero";

const Pulpit = ({ handleLogout, currentUser }) => {
	return (
		<>
			<section className='Pulpit'>
				<nav className='Pulpit__nav container'>
					<img src={logo} />
                    <div className="Pulpit__user">
					    <h2><span>Welcome </span>{currentUser.email}</h2>
					    <Button variant='primary' onClick={handleLogout} className="Pulpit__btn">
						    Logout
					    </Button>
                    </div>
				</nav>
			</section>
            <Hero/>
		</>
	);
};

export default Pulpit;
