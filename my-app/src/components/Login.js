import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.png";
import user_img from "../images/user.png";
import { useRef, useState } from "react";
import { signup, singin } from "../firebase";

const Login = () => {
	const [hasAccount, setHasAccount] = useState("false");
	const [emailError, setEmailError] = useState("");
	const emailRef = useRef();
	const passwordRef = useRef();

	async function handleSignUp(e) {
		e.preventDefault();
		try {
			await signup(emailRef.current.value, passwordRef.current.value);
		} catch {
			setEmailError("Error");
		}
	}

	async function handleSignIn(e) {
		e.preventDefault();
		try {
			await singin(emailRef.current.value, passwordRef.current.value);
		} catch {
			setEmailError("Error");
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
			<p>{emailError}</p>
			<div className='Login__box'>
    			<div className='Login__user'>
        			<img src={user_img} alt='user' width={50} />
    			</div>
    		
			<Form onSubmit={handleSignUp}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control type='email' placeholder='Enter email' ref={emailRef} />
					<Form.Text className='text-muted'>
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						ref={passwordRef}
					/>
				</Form.Group>
				{hasAccount ? (
					<>
						<Button variant='primary' type='submit'>
							Login
						</Button>
						<p>
							Don't have an account?
							<span onClick={() => setHasAccount(!hasAccount)}> Sign up</span>
						</p>
					</>
				) : (
					<>
						<Button variant='primary' type='submit'>
							Register
						</Button>
						<p>
							Have an account?
							<span onClick={() => setHasAccount(!hasAccount)}> Sign in</span>
						</p>
					</>
				)}
			</Form>
			</div>
			<img src={logo} alt='logo' width={100} />
		</section>
	);
};

export default Login;
