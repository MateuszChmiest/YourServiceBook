import React from "react";
import { useLocation, Route, Routes } from "react-router";

//* Import pages
import Exploitation from "./pages/Exploitation";
import Contact from "./pages/Contact";
import MyCars from "./pages/MyCars"
import Home from "./pages/Home";
import Insurance from "./pages/Insurance";
import Repairs from "./pages/Repairs";

import { AnimatePresence } from "framer-motion";
import CurrentCar from "./pages/CurrentCar";

const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence exitBeforeEnter>
			<Routes location={location} key={location.pathname}>
				<Route path='/' element={<Home />} />
				<Route path='/my-cars' element={<CurrentCar/>} />
				<Route path='/exploitation' element={<Exploitation />} />
				<Route path='/repairs' element={<Repairs />} />
				<Route path='/insurance' element={<Insurance />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/current-car' element={<MyCars />}/>
			</Routes>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;
