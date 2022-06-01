import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';

import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const SignUp = () => {
	const t = useTranslation();
	usePageTitle('Login');

	const [name, nameProps] = useField('name', true);
	const [email, emailProps] = useField('name', true);
	const [password, passwordProps] = useField('name', true);

	const handleSIgnUp = () => {
		console.log('signUp');
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
