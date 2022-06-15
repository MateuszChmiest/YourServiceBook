import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import carImg from "../../images/your-car.png";
import { motion } from "framer-motion";
import { getDocs, query, where, collection } from "firebase/firestore/lite";
import { db, useAuth } from "../../firebase";

const CurrentCar = () => {
	const navigate = useNavigate();
	const currentUser = useAuth();
	const [carsData, setCarsData] = useState([]);

	const getData = async () => {
		const q = query(
			collection(db, "cars"),
			where("userUID", "==", currentUser.uid)
		);
		const querySnapshot = await getDocs(q);
		try {
			if (carsData.length < querySnapshot.docs.length) {
				querySnapshot.forEach((doc) => {
					setCarsData((prevData) => [...prevData, doc.data()]);
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	// const getData = async () => {
	// 	const q = query(
	// 		collection(db, "cars"),
	// 		where("userUID", "==", currentUser.uid)
	// 	);
	// 	const querySnapshot = await getDocs(q);
	// 	if(querySnapshot.docs.length > 0 ) {
	// 		querySnapshot.forEach((doc) => {
	// 			setCarsData((prevData) => [...prevData, doc.data()]);
	// 		});
	// 	}
	// 	setHasCars(true);
	// };

	// const getData = () => {
	// 	const q = query(
	// 		collection(db, "cars"),
	// 		where("userUID", "==", currentUser.uid)
	// 	);

	// 	q.onSnapshot((querySnapshot) => {
	// 		const items =[];
	// 		querySnapshot.forEach((doc) => {
	// 			items.push(doc.data())
	// 		})
	// 		setCarsData(items);
	// 		setHasCars(true);
	// 	})
	// };

	useEffect(() => {
		if (!currentUser?.uid) return;
		getData();
	}, [currentUser?.uid]);

	return (
		<motion.section
			id='Car'
			initial={{ scaleY: 0 }}
			animate={{ scaleY: 1 }}
			exit={{ scaleY: 0 }}>
			<div className='CurrentCar'>
				<div id='btn' onClick={() => navigate("/current-car")}></div>
				<h1>Your Cars</h1>
				<div className='CurrentCar__box'>
					<div className='CurrentCar__list'>
						<ul className='CurrentCar__items'>
							{carsData.length === 0 ? (
								<h2>You don't have added cars yet :(</h2>
							) : (
								<>
									{carsData.map((data, index) => (
										<li key={index}>
											{data.make} {data.model} {data.color} {data.year}{" "}
											{data.engine} {data.enginePower} (VIN:{data.vin})
										</li>
									))}
								</>
							)}
						</ul>
					</div>
					<div className='CurrentCar__img'>
						<img src={carImg} />
					</div>
				</div>
				<button onClick={getData}>show</button>
			</div>
		</motion.section>
	);
};

export default CurrentCar;
