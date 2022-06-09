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

	const isLoginValid = () => {
		const pattern = new RegExp(
			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
		);
		if (!pattern.test(email)) {
			return false;
		}
		return true;
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
