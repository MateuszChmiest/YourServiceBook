import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useAuth } from "../../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore/lite";
import { db } from "../../firebase";
import { useNavigate } from "react-router";

function MyCar() {
	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [year, setYear] = useState("");
	const [color, setColor] = useState("");
	const [engine, setEngine] = useState("");
	const [enginePower, setEnginePower] = useState("");
	const [vin, setVin] = useState("");
	const [currentCar, setCurrentCar] = useState(false);
	const currentUser = useAuth();
	const navigate = useNavigate();

	const handleSubmitCar = async (e) => {
    e.preventDefault();
    setCurrentCar(true);
		try {
			const colRef = collection(db, 'cars');
			await addDoc(colRef, {
				make: make,
				model: model,
				year: year,
				color: color,
				engine: engine,
				enginePower: enginePower,
				vin: vin,
			});
		} catch (err) {
			console.error(err);
		}
	};

	if(currentCar) {
		return navigate("/current-car");
	}

	return (
		<motion.section
			className='My_car'
			initial={{ scaleY: 0 }}
			animate={{ scaleY: 1 }}
			exit={{ scaleY: 0 }}>
			{/* {currentCar ? (
				<CurrentCar />
			) : ( */}
				<div className='My_car__box'>
					<h1>Provide information about your car</h1>
					<Form id='mycar-form' onSubmit={handleSubmitCar}>
						<Row className='mb-3'>
							<Form.Group as={Col}>
								<Form.Label>Vehicle Make</Form.Label>
								<Form.Control
									type='text'
									placeholder='Audi'
									onChange={(e) => setMake(e.target.value)}
								/>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Label>Vehicle Model</Form.Label>
								<Form.Control
									type='text'
									placeholder='S3'
									onChange={(e) => setModel(e.target.value)}
								/>
							</Form.Group>
						</Row>

						<Row className='mb-3'>
							<Form.Group as={Col}>
								<Form.Label>Year</Form.Label>
								<Form.Control
									placeholder='2011'
									onChange={(e) => setYear(e.target.value)}
								/>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Label>Color</Form.Label>
								<Form.Control
									type='text'
									placeholder='Blue'
									onChange={(e) => setColor(e.target.value)}
								/>
							</Form.Group>
						</Row>

						<Row className='mb-3'>
							<Form.Group as={Col}>
								<Form.Label>Engine</Form.Label>
								<Form.Control
									type='text'
									placeholder='2.0 Diesel'
									onChange={(e) => setEngine(e.target.value)}
								/>
							</Form.Group>

							<Form.Group as={Col}>
								<Form.Label>Engine power</Form.Label>
								<Form.Control
									placeholder='150'
									onChange={(e) => setEnginePower(e.target.value)}
								/>
							</Form.Group>
						</Row>

						<Form.Group className='mb-3'>
							<Form.Label>VIN</Form.Label>
							<Form.Control
								placeholder='DB66532AA21Q1'
								onChange={(e) => setVin(e.target.value)}
							/>
						</Form.Group>

						<div id='car-btn'>
							<Button variant='primary' type='submit' id='mycar-btn'>
								Submit
							</Button>
						</div>
					</Form>
				</div>
			{/* )} */}
		</motion.section>
	);
}

export default MyCar;
