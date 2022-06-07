import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	Button
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import reservationService from '../hooks/reservationService';
import { useLanguage, useTranslation } from '../hooks/useTranslation';
import { ReservationData } from '../utils/types';

type Props = {
	reservation: ReservationData;
	index: number;
	handleDelete: (id: number, index: number) => void;
};

const ReservationCard = ({ reservation, index, handleDelete }: Props) => {
	const navigate = useNavigate();
	const t = useTranslation();
	const [language] = useLanguage();

	const [focused, setFocused] = useState<boolean>(false);

	return (
		<Card
			onMouseOver={() => setFocused(true)}
			onMouseLeave={() => setFocused(false)}
		>
			<Box
				display="flex"
				sx={{
					visibility: focused ? 'visible' : 'hidden',
					justifyContent: 'end'
				}}
			>
				<Button
					color="primary"
					variant="contained"
					onClick={() => handleDelete(reservation.id, index)}
				>
					Delete
				</Button>
			</Box>
			<CardActionArea onClick={() => navigate(`/rooms/${reservation.roomId}`)}>
				<CardMedia
					component="img"
					image={
						reservation.room.pictures.length !== 0
							? reservation.room.pictures[0].url
							: '/room.png'
					}
					sx={{ maxHeight: '50%', maxWidth: '50%' }}
				/>
				<CardContent>
					<Typography gutterBottom variant="h4" component="div">
						{reservation.room.name}
					</Typography>
					<Typography gutterBottom variant="h5" component="div">
						{t('from')}:{' '}
						{new Date(reservation.from).toLocaleDateString(language)}
					</Typography>
					<Typography gutterBottom variant="h5" component="div">
						{t('to')}: {new Date(reservation.to).toLocaleDateString(language)}
					</Typography>
					<Typography gutterBottom variant="h5" component="div">
						{t('price')}: {reservation.price} CZK
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ReservationCard;
