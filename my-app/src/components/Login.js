import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.png";
import user_img from "../images/user.png";
import { useState } from "react";
import { signup, login, useAuth, logout, auth } from "../firebase";
import Pulpit from "./Hero";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Preloader from "./Preloader";

const Login = () => {
	const [hasAccount, setHasAccount] = useState("false");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const currentUser = useAuth();

	//Function to SignUp
	async function handleSignUp(e) {
		e.preventDefault();
		clearError();
		setLoading(true);
		if (password !== repeatPassword) {
			return setError("Passwords are not the same") & setLoading(false);
		}
		// if (password.length > 6 || repeatPassword.length > 6) {
		// 	return setError("Password must be longer than 6 characters") & setLoading(false);
		// }
		try {
			await signup(email, password);
		} catch {
			setError("Password must be longer than 6 characters");
			clearInputs();
		}
		setLoading(false);
	}

	//Function to SignIn
	async function handleSignIn(e) {
		e.preventDefault();
		clearError();
		setLoading(true);
		try {
			await login(email, password);
		} catch {
			setError("Invalid email or password");
			clearInputs();
		}
		setLoading(false);
	}

	function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	}

	//Function to Logout
	async function handleLogout() {
		clearInputs();
		try {
			logout();
		} catch {
			alert("Error");
		}
	}

	//Functions clear
	function clearInputs() {
		setEmail("");
		setPassword("");
		setRepeatPassword("");
	}

	function clearError() {
		setError("");
	}

	return (
		<>
			{currentUser ? (
				<>
				<Preloader/>
				<Router>
					<Pulpit handleLogout={handleLogout} currentUser={currentUser} />
					<Routes>
						<Route path='/' />
					</Routes>
				</Router>
				</>
			) : (
				<section className='Login'>
					{hasAccount ? (
						<h1>
							Sign <span>In!</span>
						</h1>
					) : (
						<h1>
							Join <span>Us!</span>
						</h1>
					)}
					<p>{currentUser?.email}</p>
					<div className='Login__box'>
						<div className='Login__user'>
							<img src={user_img} alt='user' width={50} />
						</div>

						<Form onSubmit={hasAccount ? handleSignIn : handleSignUp}>
							<Form.Group className='mb-3' controlId='formBasicEmail'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Form.Text className='text-muted'>
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>
							{hasAccount ? (
								<>
									<Form.Group className='mb-3' controlId='formBasicPassword'>
										<Form.Label>Password</Form.Label>
										<Form.Control
											type='password'
											placeholder='Password'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Form.Group>
									<div id='error-text'>{error}</div>
								</>
							) : (
								<>
									<Form.Group className='mb-3' controlId='formBasicPassword'>
										<Form.Label>Password</Form.Label>
										<Form.Control
											type='password'
											placeholder='Password'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Form.Group>
									<Form.Group
										className='mb-3'
										controlId='formRepeatBasicPassword'>
										<Form.Label>Repeat password</Form.Label>
										<Form.Control
											type='password'
											placeholder='Password'
											value={repeatPassword}
											onChange={(e) => setRepeatPassword(e.target.value)}
										/>
									</Form.Group>
									<div id='error-text'>{error}</div>
								</>
							)}
							{hasAccount ? (
								<>
									<Button
										variant='primary'
										type='submit'
										disabled={loading || currentUser}
										id='Login__btn'>
										Login
									</Button>
									<Button variant='light' onClick={signInWithGoogle}>
										<FcGoogle />
									</Button>
									<p>
										Don't have an account?
										<span
											onClick={() => setHasAccount(!hasAccount) & clearError()}>
											{" "}
											Sign up
										</span>
									</p>
								</>
							) : (
								<>
									<Button
										variant='primary'
										type='submit'
										disabled={loading || currentUser}
										id='Login__btn'>
										Register
									</Button>
									<Button variant='light' onClick={signInWithGoogle}>
										<FcGoogle />
									</Button>
									<p>
										Have an account?
										<span
											onClick={() => setHasAccount(!hasAccount) & clearError()}>
											{" "}
											Sign in
										</span>
									</p>
								</>
							)}
						</Form>
					</div>
					<img src={logo} alt='logo' width={100} />
				</section>
			)}
		</>
	);
};

export default Login;
