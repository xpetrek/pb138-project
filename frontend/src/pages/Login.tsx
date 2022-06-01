import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

import useField from '../hooks/useField';
import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';

const Login = () => {
	const t = useTranslation();
	usePageTitle('Login');

	const [email, emailProps] = useField('name', true);
	const [password, passwordProps] = useField('name', true);
	const handleLogin = () => {
		console.log('login');
	};

	const handleLogout = () => {
		console.log('logout');
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
