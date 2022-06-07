import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useField from '../hooks/useField';
import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';

const Login = () => {
	const t = useTranslation();
	usePageTitle('Login');
	const navigate = useNavigate();

	const [email, emailProps] = useField('name', true);
	const [password, passwordProps] = useField('name', true);
	const { session, loading, error, login, logout } = useLoggedInUser();

	const handleLogin = () => {
		login(email, password);
		navigate('/searchRooms');
	};

	return (
		<Box>
			<TextField label={t('email')} {...emailProps} type="email" />
			<TextField label={t('password')} {...passwordProps} type="password" />
			<Button variant="contained" onClick={handleLogin}>
				Login
			</Button>
		</Box>
	);
};

export default Login;
