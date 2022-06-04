import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const SignUp = () => {
	const t = useTranslation();
	usePageTitle('Login');
	const navigate = useNavigate();

	const [name, nameProps] = useField('name', true);
	const [email, emailProps] = useField('name', true);
	const [password, passwordProps] = useField('name', true);
	const { session, loading, error, login, signUp } = useLoggedInUser();

	const handleSIgnUp = () => {
		signUp(name, email, password);
		navigate('/');
	};

	return (
		<Box>
			<TextField label={t('name')} {...nameProps} type="text" />
			<TextField label={t('email')} {...emailProps} type="email" />
			<TextField label={t('password')} {...passwordProps} type="password" />
			<Button variant="contained" onClick={handleSIgnUp}>
				Login
			</Button>
		</Box>
	);
};

export default SignUp;
