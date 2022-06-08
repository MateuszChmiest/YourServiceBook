import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//* Import icons
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//*Import images
import user_img from "../images/user.png";

//* Import firebase
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signup, login, useAuth, logout, auth, authGoogle } from "../firebase";

//* Import icons
import { FcGoogle } from "react-icons/fc";

//* Import components
import Pulpit from "./Hero";
import Preloader from "./Preloader";

//* Import pages
import Exploitation from "./pages/Exploitation";
import Contact from "./pages/Contact";
import MyCar from "./pages/MyCar";
import Home from "./pages/Home";
import Insurance from "./pages/Insurance";
import Repairs from "./pages/Repairs";

const Login = () => {
	const [hasAccount, setHasAccount] = useState("false");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const currentUser = useAuth();

	//* Function to SignUp
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

	//* Function to SignIn
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
		signInWithPopup(authGoogle, provider);
	}

	//* Function to Logout
	async function handleLogout() {
		clearInputs();
		try {
			logout();
		} catch {
			alert("Error");
		}
	}

	//* Functions clear
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
						<Route path='/' element={<Home/>}/>
						<Route path='/my-car' element={<MyCar/>}/>
						<Route path='/exploitation' element={<Exploitation/>}/>
						<Route path='/repairs' element={<Repairs/>}/>
						<Route path='/insurance' element={<Insurance/>}/>
						<Route path='/contact' element={<Contact/>}/>
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
									<Button variant='light' id="GoogleBtn" onClick={signInWithGoogle}>
										<FcGoogle /> Sign in with Google
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
									<Button variant='light' id="GoogleBtn" onClick={signInWithGoogle}>
										<FcGoogle /> Sign in with Google
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
					<p id="Login__copyright">© 2022 YourServiceBook, All Rights Reserved</p>
				</section>
			)}
		</>
	);
};

export default Login;
