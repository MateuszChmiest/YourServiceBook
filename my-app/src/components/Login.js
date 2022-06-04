import { Button,Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.png"
import user_img from "../images/user.png"
import { useState } from "react";

const Login = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordEddor] = useState('');
    const [hasAccount, setHasAccount] = useState('false')

	return (
		<section className='Login'>
			<h1>Join <span>Us!</span></h1>
			<div className='Login__box'>
                <div className="Login__user">
                     <img src={user_img} alt="user" width={50}/>
                </div>
				<Form>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control type='email' placeholder='Enter email' />
						<Form.Text className='text-muted'>
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control type='password' placeholder='Password' />
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicCheckbox'>
						<Form.Check type='checkbox' label='Check me out' />
					</Form.Group>
					<Button variant='primary' type='submit'>
						Login
					</Button>
				</Form>
			</div>
            <img src={logo} alt="logo" width={100}/>
		</section>
	);
};

export default Login;
