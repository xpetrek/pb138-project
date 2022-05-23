import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		console.log("login")
	};

	const handleLogout = () => {
		console.log("logout")
	};

	return (
		<>
			<TextField
				label="Email"
				name="email"
				fullWidth
				required
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<TextField
				label="Password"
				name="password"
				value={password}
				multiline
				fullWidth
				maxRows={5}
				onChange={e => setPassword(e.target.value)}
			/>
			<Button variant="contained" onClick={handleLogin}>
				Submit
			</Button>
			<Button variant="contained" onClick={handleLogout}>
				Logout
			</Button>
		</>
	);
};

export default Login;
