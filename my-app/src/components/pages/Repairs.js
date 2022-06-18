import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Form, Col, Row, Button, Modal } from "react-bootstrap";
import {
	getDocs,
	query,
	where,
	collection,
	addDoc,
	deleteDoc,
	doc,
} from "firebase/firestore/lite";
import { db, useAuth } from "../../firebase";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";

function Repairs() {
	const currentUser = useAuth();
	const [repairs, setRepairs] = useState("");
	const [car, setCar] = useState("");
	const [date, setDate] = useState("");
	const [error, setError] = useState("");
	const [modal, setModal] = useState(false);
	const [carsData, setCarsData] = useState([]);
	const [repairsData, setRepairsData] = useState([]);

	//* function get car data
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

	//* Function add data
	const handleAdd = async () => {
		try {
			const colRef = collection(db, "repairs");
			const reaposne = await addDoc(colRef, {
				repair: repairs,
				car: car,
				date: date,
				userUID: currentUser.uid,
			});

			// getExpData();
			setRepairsData((prevData) => [
				...prevData,
				{
					repair: repairs,
					car: car,
					date: date,
					userUID: currentUser.uid,
					id: reaposne.id,
				},
			]);
		} catch (err) {
			console.error(err);
		}
		clearInputs();
	};

	//* Function get repairs data
	const getRepairsData = async () => {
		const q = query(
			collection(db, "repairs"),
			where("userUID", "==", currentUser.uid)
		);
		const qSnapshot = await getDocs(q);
		try {
			// setRepairsData([]);
			if (repairsData.length < qSnapshot.docs.length) {
				qSnapshot.forEach((doc) => {
					setRepairsData((prevData) => [
						...prevData,
						{ ...doc.data(), id: doc.id },
					]);
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	//* Function delete exploitation
	const deleteExp = async (deleteID) => {
		try {
			await deleteDoc(doc(db, "repairs", deleteID));
			setRepairsData((prev) => prev.filter((el) => el.id !== deleteID));
		} catch (err) {
			console.error(err);
		}
	};

	//* Function clear inputs
	const clearInputs = () => {
		setRepairs("");
		setDate("");
		setCar("");
	};

	//* UseEffect
	useEffect(() => {
		if (!currentUser?.uid) return;
		getRepairsData();
	}, [currentUser?.uid]);

	//* Validation
	const handleValidAdd = (e) => {
		e.preventDefault();
		if (repairs === "" || car === "" || date === "") {
			setError("All fields must be completed.");
			setModal(true);
		} else {
			handleAdd();
		}
	};

	return (
		<motion.section
			className='Repairs'
			initial={{ scaleY: 0 }}
			animate={{ scaleY: 1 }}
			exit={{ scaleY: 0 }}>
			<div className='Repairs__box'>
				<Form className='Repairs__form' onSubmit={handleValidAdd}>
					<Form.Group as={Col} lg={12}>
						<Form.Control
							type='text'
							value={repairs}
							className='Repairs__input'
							placeholder='Engine repair..'
							onChange={(e) => setRepairs(e.target.value)}
						/>
					</Form.Group>
					<Row className='mb-3'>
						<Form.Group as={Col} lg={6}>
							<Form.Select
								value={car}
								onClick={getData}
								className='Repairs__input'
								style={{ cursor: "pointer" }}
								onChange={(e) => setCar(e.target.value)}>
								<option>Select car</option>
								{carsData.map((car, index) => (
									<option key={index}>
										{car.make} {car.model}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						<Form.Group as={Col} lg={6}>
							<Form.Control
								type='date'
								value={date}
								className='Repairs__input'
								onChange={(e) => setDate(e.target.value)}
							/>
						</Form.Group>
					</Row>
					<Button type='submit' className='Repairs__submit'>
						Add a repair <AiFillPlusCircle />
					</Button>
				</Form>
				{repairsData.length === 0 ? null : (
					<ul className='Repairs__list'>
						{repairsData.map((repairData) => (
							<li className='Repairs__element' key={repairData.id}>
								{repairData.repair} | {repairData.car} | {repairData.date}
								<button
									className='Repairs__btn'
									type='button'
									onClick={() => deleteExp(repairData.id)}>
									<AiFillDelete />
								</button>
							</li>
						))}
					</ul>
				)}
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

export default Repairs;
