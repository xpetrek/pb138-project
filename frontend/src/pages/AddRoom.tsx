import { Box, Button, MenuItem, TextField } from '@mui/material';

import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import roomService from '../hooks/roomService';
import useLoggedInUser from '../hooks/useLoggedInUser';

const AddRoom = () => {
	usePageTitle('Add room');
	const t = useTranslation();
	const { session } = useLoggedInUser();

	const [name, nameProps] = useField('name', true);
	const [description, descriptionProps] = useField('description', true);
	const [location, locationProps] = useField('location', true);
	const [ppd, ppdProps] = useField('price', true);
	const [imageURL, imageURLProps] = useField('image', true);
	const [imageLabel, imageLabelProps] = useField('image', true);

	const handleAddRoom = () => {
		if (!session) return;
		roomService.create(
			name,
			description,
			location,
			Number.parseInt(ppd),
			imageURL,
			imageLabel,
			session
		);
	};

	const LOCATIONS = [' ', t('brno'), t('prague')];

	return (
		<>
			<Box>
				<div>
					<TextField label={t('name')} {...nameProps} type="email" />
					<TextField
						label={t('description')}
						{...descriptionProps}
						type="text"
					/>
					<TextField
						className="add-room--locaiton"
						label={t('location')}
						{...locationProps}
						select
						type="text"
					>
						{LOCATIONS.map((location: string, i: number) => (
							<MenuItem key={i} value={location}>
								{location}
							</MenuItem>
						))}
					</TextField>
					<TextField label={t('ppd')} {...ppdProps} type="number" />
				</div>

				<div>
					<TextField label={t('imageUrl')} {...imageURLProps} type="text" />
					<TextField label={t('imageLabel')} {...imageLabelProps} />
				</div>
				{imageURL ? (
					<Box
						sx={{
							height: '50%',
							width: '50%'
						}}
						component="img"
						alt="Bad photo"
						src={imageURL}
					/>
				) : null}
			</Box>
			<Button variant="contained" onClick={handleAddRoom}>
				{t('submit')}
			</Button>
		</>
	);
};

export default AddRoom;
