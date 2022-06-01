import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const AddRoom = () => {
	const t = useTranslation();
	usePageTitle('Add room');

	const [name, nameProps] = useField('name', true);
	const [description, descriptionProps] = useField('description', true);
	const [location, locationProps] = useField('location', true);
	const [ppd, ppdProps] = useField('location', true);

	return (
		<Box>
			<TextField label={t('name')} {...nameProps} type="email" />
			<TextField label={t('description')} {...descriptionProps} type="text" />
			<TextField label={t('location')} {...locationProps} type="text" />
			<TextField label={t('ppd')} {...ppdProps} type="text" />
			<Button>{t('submit')}</Button>
		</Box>
	);
};

export default AddRoom;
