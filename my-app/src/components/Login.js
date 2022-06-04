// import { Button, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.png";
import user_img from "../images/user.png";
import { useRef, useState } from "react";
import { signup, singin } from "../firebase";

const Login = () => {
	const [hasAccount, setHasAccount] = useState("false");
	const [emailError, setEmailError] = useState("");
	const emailRef = useRef();
	const passwordRef = useRef();

	async function handleSignUp() {
		try {
			await signup(emailRef.current.value, passwordRef.current.value);
		} catch {
			alert("Error");
		}
	}

	async function handleSignIn() {
		try {
			await singin(emailRef.current.value, passwordRef.current.value);
		} catch {
			alert("Error");
		}
	}

	return (
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
			<div className='Login__box'>
				<div className='Login__user'>
					<img src={user_img} alt='user' width={50} />
				</div>
				<div className='Login__form'>
					<input ref={emailRef} type='email' placeholder='Enter email' />
					<input type='password' ref={passwordRef} placeholder='Password' />
					{hasAccount ? (
						<>
							<button onClick={handleSignUp}>Sign Up</button>
                            <p>
								Don't have an account?
								<span onClick={() => setHasAccount(!hasAccount)}> Sign up</span>
							</p>
						</>
					) : (
						<>
							<button onClick={handleSignIn}>Sign Up</button>
                            <p>
								Have an account?
								<span onClick={() => setHasAccount(!hasAccount)}> Sign in</span>
							</p>
						</>
					)}
				</div>
				{/* <Form>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							ref={emailRef}
						/>
						<Form.Text className='text-muted'>
							We'll never share your email with anyone else. */}
				{/* </Form.Text> */}
				{/* <p className='errorMsg'>{emailError}</p> */}
				{/* </Form.Group> */}

				{/* <Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
                            ref={passwordRef}
						/> */}
				{/* <p className='errorMsg'>{passwordError}</p> */}
				{/* </Form.Group>
					{hasAccount ? (
						<>
							<Button variant='primary' type='submit' >
								Login
							</Button>
							<p>
								Don't have an account?
								<span onClick={() => setHasAccount(!hasAccount)}> Sign up</span>
							</p>
						</>
					) : (
						<>
							<Button variant='primary' type='submit' onClick={handleSignup}>
								Register
							</Button>
							<p>
								Have an account?
								<span onClick={() => setHasAccount(!hasAccount)}> Sign in</span>
							</p>
						</>
					)}
				</Form> */}
			</div>
			<img src={logo} alt='logo' width={100} />
		</section>
	);
};

export default Login;
