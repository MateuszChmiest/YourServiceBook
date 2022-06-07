import React from "react";
import Preloader from "./components/Preloader";
import Login from "./components/Login";
// import Hero from "./components/Hero";
// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const App = () => {
	return (
		<>
			<Preloader />
			<Login />
		</>
	);
};
export default App;
