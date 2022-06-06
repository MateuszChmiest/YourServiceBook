import React, { useEffect, useState } from "react";
import "../sass/elements/_preloader.scss";
import logo from "../images/logo.png"
import BarLoader from "react-spinners/BarLoader";

const Preloader = () => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, []);

	return (
		<>
			{loading ? (
				<div className='Preloader'>
					<header className='Preloader__header'>
						<img src={logo} alt='logo' />
					</header>
                    <BarLoader color={"#38B6FF"} loading={loading} size={15}/>
				</div>
			) : null}
		</>
	);
};

export default Preloader;
