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

	const [email, emailProps] = useField('name', true);
	const [password, passwordProps] = useField('name', true);
	const { login, error, session } = useLoggedInUser();

	const handleLogin = () => {
		login(email, password);
		console.log(session);
		if (error !== undefined) return;
		navigate('/searchRooms');
	};

	return (
		<Box>
			<TextField label={t('email')} {...emailProps} type="email" />
			<TextField label={t('password')} {...passwordProps} type="password" />
			<Button variant="contained" onClick={handleLogin}>
				{t('loginButtonText')}
			</Button>
		</Box>
	);
};

export default Login;
