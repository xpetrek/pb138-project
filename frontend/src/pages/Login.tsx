import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useField from '../hooks/useField';
import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';

const Login = () => {
	const t = useTranslation();
	usePageTitle('Login');
	const navigate = useNavigate();

	const [email, emailProps] = useField('email', true, 'email');
	const [password, passwordProps] = useField('password', true, 'password');
	const { login, error, session } = useLoggedInUser();

	const handleLogin = () => {
		login(email, password);
		console.log(session);
		if (error !== undefined) return;
		navigate('/searchRooms');
	};

	return (
		<Box className="login--box">
			<TextField label={t('email')} {...emailProps} type="email" />
			<TextField label={t('password')} {...passwordProps} type="password" />
			<Button
				className="login--button"
				variant="contained"
				onClick={handleLogin}
			>
				{t('loginButtonText')}
			</Button>
		</Box>
		// {loginFailed ? (
		// 	<Typography fontSize="1.5rem" className="login--failed-message">
		// 		{t('loginFailed')}
		// 	</Typography>
		// ) : null}
	);
};

export default Login;
