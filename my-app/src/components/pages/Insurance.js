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
	updateDoc
} from "firebase/firestore/lite";
import { db, useAuth } from "../../firebase";
import { AiFillPlusCircle, AiFillDelete, AiOutlineEdit  } from "react-icons/ai";

function Insurance() {
	const currentUser = useAuth();
	const [insurance, setInsurance] = useState("");
	const [car, setCar] = useState("");
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [error, setError] = useState("");
	const [modal, setModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [carsData, setCarsData] = useState([]);
	const [insuranceData, setInsuranceData] = useState([]);
	const [editInsurance, setEditInsurance] = useState("");
	const [editCar, setEditCar] = useState("");
	const [editFromDate, setEditFromDate] = useState("");
	const [editToDate, setEditToDate] = useState("");
	const [editID, setEditID] = useState("");

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
			const colRef = collection(db, "insurance");
			const reaposne = await addDoc(colRef, {
				insurance: insurance,
				car: car,
				fromDate: fromDate,
				toDate: toDate,
				userUID: currentUser.uid,
			});

			// getExpData();
			setInsuranceData((prevData) => [
				...prevData,
				{
					insurance: insurance,
					car: car,
					fromDate: fromDate,
					toDate: toDate,
					userUID: currentUser.uid,
					id: reaposne.id,
				},
			]);
		} catch (err) {
			console.error(err);
		}
		clearInputs();
	};

	//* Function get insurance data
	const getInsuranceData = async () => {
		const q = query(
			collection(db, "insurance"),
			where("userUID", "==", currentUser.uid)
		);
		const qSnapshot = await getDocs(q);
		try {
			// setRepairsData([]);
			if (insuranceData.length < qSnapshot.docs.length) {
				qSnapshot.forEach((doc) => {
					setInsuranceData((prevData) => [
						...prevData,
						{ ...doc.data(), id: doc.id },
					]);
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	//* Function delete insurance
	const deleteExp = async (deleteID) => {
		try {
			await deleteDoc(doc(db, "insurance", deleteID));
			setInsuranceData((prev) => prev.filter((el) => el.id !== deleteID));
		} catch (err) {
			console.error(err);
		}
	};

		//* Function update Insurance
		const updateExp = async (updateID) => {
			try {
				if (editCar === "" || editInsurance === "" || editFromDate === "" || editToDate === "") {
					setError("All fields must be completed.");
					setModal(true);
				} else {
					await updateDoc(doc(db, "insurance", updateID), {
						insurance: editInsurance,
						car: editCar,
						fromDate: editFromDate,
						toDate: editToDate
					});
					setInsuranceData((prevData) =>
						prevData.map((data) =>
							data.id === updateID
								? {...data, insurance: editInsurance, car: editCar, fromDate: editFromDate, toDate: editToDate}
								: data
						)
					);
				}
			} catch (err) {
				console.error(err);
			}
			clearModalInputs();
		};

	//* Function clear inputs
	const clearInputs = () => {
		setInsurance("");
		setFromDate("");
		setToDate("");
		setCar("");
	};

	const clearModalInputs = () => {
		setEditCar("");
		setEditInsurance("")
		setEditFromDate("");
		setEditToDate("")
	}

	//* UseEffect
	useEffect(() => {
		if (!currentUser?.uid) return;
		getInsuranceData();
	}, [currentUser?.uid]);

	//* Validation
	const handleValidAdd = (e) => {
		e.preventDefault();
		if (insurance === "" || car === "" || fromDate === "" || toDate === "") {
			setError("All fields must be completed.");
			setModal(true);
		} else {
			handleAdd();
		}
	};

	return (
		<motion.section
			className='Insurance'
			initial={{ scaleY: 0 }}
			animate={{ scaleY: 1 }}
			exit={{ scaleY: 0 }}>
			<div className='Insurance__box'>
				<Form className='Insurance__form' onSubmit={handleValidAdd}>
					<Form.Group as={Col} lg={12}>
						<Form.Control
							type='text'
							value={insurance}
							className='Insurance__input'
							placeholder='AVIVA | OC/AC..'
							onChange={(e) => setInsurance(e.target.value)}
						/>
					</Form.Group>
					<Row className='mb-3'>
						<Form.Group as={Col} lg={6}>
							<Form.Select
								value={car}
								onClick={getData}
								className='Insurance__input'
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
						<Form.Group as={Col} lg={3}>
							<Form.Control
								type='date'
								value={fromDate}
								className='Insurance__input'
								onChange={(e) => setFromDate(e.target.value)}
							/>
						</Form.Group>
						<Form.Group as={Col} lg={3}>
							<Form.Control
								type='date'
								value={toDate}
								className='Insurance__input'
								onChange={(e) => setToDate(e.target.value)}
							/>
						</Form.Group>
					</Row>
					<Button type='submit' className='Insurance__submit'>
						Add insurance <AiFillPlusCircle />
					</Button>
				</Form>
				{insuranceData.length === 0 ? null : (
					<ul className='Insurance__list'>
						{insuranceData.map((insuranceData) => (
							<li className='Insurance__element' key={insuranceData.id}>
								{insuranceData.insurance} | {insuranceData.car} | ( from{" "}
								{insuranceData.fromDate} to {insuranceData.toDate} )
								<div>
								<button
									className='Exploitation__btn'
									type='button'
									onClick={() => setEditModal(true) & setEditID(insuranceData.id)}>
									<AiOutlineEdit />
								</button>
								<button
									className='Exploitation__btn'
									type='button'
									onClick={() => deleteExp(insuranceData.id)}>
									<AiFillDelete />
								</button>
								</div>
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
				<Modal show={editModal} onHide={() => setEditModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit insurance</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className='mb-3'>
								<Form.Control
									value={editInsurance}
									type='text'
									placeholder='AVIVA | OC/AC..'
									onChange={(e) => setEditInsurance(e.target.value)}
									autoFocus
								/>
							</Form.Group>
							<Form.Select
								className='mb-3'
								value={editCar}
								onClick={getData}
								style={{ cursor: "pointer" }}
								onChange={(e) => setEditCar(e.target.value)}>
								<option>Select Car</option>
								{carsData.map((car, index) => (
									<option key={index}>
										{car.make} {car.model}
									</option>
								))}
							</Form.Select>
							<Form.Group className='mb-3'>
								<Form.Control
									type='date'
									value={editFromDate}
									onChange={(e) => setEditFromDate(e.target.value)}
									autoFocus
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Control
									type='date'
									value={editToDate}
									onChange={(e) => setEditToDate(e.target.value)}
									autoFocus
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='primary'
							onClick={(e) => setEditModal(false) & updateExp(editID)}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</motion.section>
	);
}

export default Insurance;
