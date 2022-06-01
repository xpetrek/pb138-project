import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';

import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import userService from '../hooks/userService';

const SignUp = () => {
	const t = useTranslation();
	usePageTitle('Login');

	const [name, nameProps] = useField('name', true);
	const [email, emailProps] = useField('name', true);
	const [password, passwordProps] = useField('name', true);

	const handleSIgnUp = () => {
		userService.signUp(name, email, password);
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
