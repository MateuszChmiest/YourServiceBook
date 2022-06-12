import React, { useState } from "react";
import { useNavigate } from "react-router";
import carImg from "../../images/your-car.png";
import { motion } from "framer-motion";
import { getDocs, query, where, collection } from "firebase/firestore/lite";
import { db, useAuth} from "../../firebase";


const CurrentCar = () => {
	const [hasCars, setHasCars] = useState(false);
	const navigate = useNavigate();
	const currentUser = useAuth();
	const [carsData, setCarsData] =  useState([]);

	const getData = async (e) => {
		e.preventDefault()
		const q = query(collection(db, "cars"), where("userUID", "==", currentUser.uid));
		const querySnapshot = await getDocs(q);
		try {
			querySnapshot.forEach((doc) => {
			  setCarsData((prevData) => [...prevData, doc.data()]);
			  setHasCars(true)
			});
		} catch(err) {
			console.error(err)
		}
	}

	return (
		<motion.section id="Car" initial={{scaleY:0}} animate={{scaleY:1}} exit={{scaleY:0}}>
		<div className='CurrentCar'>
			<div id="btn" onClick={() => navigate("/current-car")}></div>
            <h1>Your Cars</h1>
			<div className='CurrentCar__box'>
				<div className='CurrentCar__list'>
					<ul className='CurrentCar__items'>
						{hasCars ? 
						(
						<>
						{carsData.map((data) => <li key={data.vin}>
							{data.make} {data.model} {data.color} {data.year} {data.engine} {data.enginePower} (VIN:{data.vin})
							</li>)}
						</>
						) : (
							<h2>You don't have added cars yet :(</h2>
						)}
					</ul>
				</div>
				<div className='CurrentCar__img'>
					<img src={carImg} />
				</div>
			</div>
		</div>
		<button onClick={getData}>clikc</button>
		</motion.section>
	);
};

export default CurrentCar;
