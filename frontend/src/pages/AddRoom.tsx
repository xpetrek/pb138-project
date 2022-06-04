import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import roomService from '../hooks/roomService';
import { LOCATIONS } from '../utils/constants';
import ImageForm from '../components/ImageForm';

const AddRoom = () => {
	const t = useTranslation();
	usePageTitle('Add room');

	const [name, nameProps] = useField('name', true);
	const [description, descriptionProps] = useField('description', true);
	const [location, locationProps] = useField('location', true);
	const [ppd, ppdProps] = useField('price', true);
	const [images, setImages] = useState<{ url: string; label: string }[]>([]);
	const handleAddRoom = () => {
		roomService.create(name, description, location, Number.parseInt(ppd));
	};
	return (
		<Box>
			<TextField label={t('name')} {...nameProps} type="email" />
			<TextField label={t('description')} {...descriptionProps} type="text" />
			<TextField label={t('location')} {...locationProps} select type="text">
				{LOCATIONS.map((location: string) => (
					<MenuItem key={location} value={location}>
						{location}
					</MenuItem>
				))}
			</TextField>
			<TextField label={t('ppd')} {...ppdProps} type="number" />
			<ImageForm images={images} setImages={setImages} />
			<Button onClick={handleAddRoom}>{t('submit')}</Button>
		</Box>
	);
};

export default AddRoom;
