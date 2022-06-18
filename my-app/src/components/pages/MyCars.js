import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Form, Col, Row, Modal } from "react-bootstrap";
import { useAuth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore/lite";
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
	const [error, setError] = useState("");
	const [modal, setModal] = useState(false);
	const currentUser = useAuth();
	const navigate = useNavigate();

	const handleSubmitCar = async () => {
		try {
			const colRef = collection(db, "cars");
			await addDoc(colRef, {
				make: make,
				model: model,
				year: year,
				color: color,
				engine: engine,
				enginePower: enginePower,
				vin: vin,
				userUID: currentUser.uid,
			});
		} catch (err) {
			console.error(err);
		}
		navigate("/my-cars");
	};

	const validationSubmitCar = (e) => {
		e.preventDefault();
		if (
			make === "" ||
			model === "" ||
			year === "" ||
			color === "" ||
			engine === "" ||
			enginePower === "" ||
			vin === ""
		) {
			setError("All fields must be completed.");
			setModal(true);
		} else {
			handleSubmitCar();
		}
	};

	return (
		<motion.section
			className='My_car'
			initial={{ scaleY: 0 }}
			animate={{ scaleY: 1 }}
			exit={{ scaleY: 0 }}>
			<div className='My_car__box'>
				<div id='btnClose' onClick={() => navigate("/my-cars")}></div>
				<h1>Provide information about your car</h1>
				<Form id='mycar-form' onSubmit={validationSubmitCar}>
					<Row className='mb-3'>
						<Form.Group as={Col}>
							<Form.Label>Vehicle Make</Form.Label>
							<Form.Control
								type='text'
								value={make}
								placeholder='Audi'
								onChange={(e) => setMake(e.target.value)}
							/>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Vehicle Model</Form.Label>
							<Form.Control
								type='text'
								placeholder='S3'
								value={model}
								onChange={(e) => setModel(e.target.value)}
							/>
						</Form.Group>
					</Row>

					<Row className='mb-3'>
						<Form.Group as={Col}>
							<Form.Label>Year</Form.Label>
							<Form.Control
								placeholder='2011'
								value={year}
								onChange={(e) => setYear(e.target.value)}
							/>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Color</Form.Label>
							<Form.Control
								type='text'
								value={color}
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
								value={engine}
								placeholder='2.0 Diesel'
								onChange={(e) => setEngine(e.target.value)}
							/>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Engine power</Form.Label>
							<Form.Control
								placeholder='150 HP'
								value={enginePower}
								onChange={(e) => setEnginePower(e.target.value)}
							/>
						</Form.Group>
					</Row>

					<Form.Group className='mb-3'>
						<Form.Label>VIN</Form.Label>
						<Form.Control
							placeholder='DB66532AA21Q1'
							value={vin}
							onChange={(e) => setVin(e.target.value)}
						/>
					</Form.Group>

					<div id='car-btn'>
						<Button variant='primary' type='submit' id='mycar-btn'>
							Submit
						</Button>
					</div>
				</Form>
				<Modal
					size='sm'
					show={modal}
					onHide={() => setModal(false)}
					aria-labelledby='example-modal-sizes-title-sm'>
					<Modal.Header closeButton>
						<Modal.Title id='example-modal-sizes-title-sm'>Error</Modal.Title>
					</Modal.Header>
					<Modal.Body>{error}</Modal.Body>
				</Modal>
			</div>
		</motion.section>
	);
}

export default MyCar;
