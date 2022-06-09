import React from "react";
import { useLocation, Route, Routes } from "react-router";

//* Import pages
import Exploitation from "./pages/Exploitation";
import Contact from "./pages/Contact";
import MyCar from "./pages/MyCar";
import Home from "./pages/Home";
import Insurance from "./pages/Insurance";
import Repairs from "./pages/Repairs";

import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence exitBeforeEnter>
			<Routes location={location} key={location.pathname}>
				<Route path='/' element={<Home />} />
				<Route path='/my-car' element={<MyCar />} />
				<Route path='/exploitation' element={<Exploitation />} />
				<Route path='/repairs' element={<Repairs />} />
				<Route path='/insurance' element={<Insurance />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;
