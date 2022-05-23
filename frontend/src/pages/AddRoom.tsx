import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const AddRoom = () => {
	const t = useTranslation();
	usePageTitle('Login');

	const [name, nameProps] = useField('name', true);
	const [description, descriptionProps] = useField('description', true);
	const [location, setLocation] = useField('location', true);

	return (
		<Box>
			<TextField label={t('name')} {...nameProps} type="email" />
			<TextField
				label={t('description')}
				{...descriptionProps}
				type="password"
			/>
		</Box>
	);
};

export default AddRoom;
