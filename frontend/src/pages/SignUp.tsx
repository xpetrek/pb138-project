import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const SignUp = () => {
	const t = useTranslation();
	usePageTitle('Login');
	const navigate = useNavigate();

	const [name, nameProps] = useField('name', true, 'name');
	const [email, emailProps] = useField('email', true, 'email');
	const [password, passwordProps] = useField('password', true, 'password');
	const { signUp } = useLoggedInUser();

	const handleSignUp = () => {
		signUp(name, email, password);
		navigate('/searchRooms');
	};

	return (
		<Box className="signup--box">
			<TextField label={t('name')} {...nameProps} type="text" />
			<TextField label={t('email')} {...emailProps} type="email" />
			<TextField label={t('password')} {...passwordProps} type="password" />
			<Button
				className="signup--button"
				variant="contained"
				onClick={handleSignUp}
			>
				{t('signUpButtonText')}
			</Button>
		</Box>
	);
};

export default SignUp;
