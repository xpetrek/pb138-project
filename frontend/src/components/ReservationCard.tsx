import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Grid
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '../hooks/useTranslation';

const ReservationCard = () => {
	const navigate = useNavigate();

	return (
		<Card>
			<CardActionArea onClick={() => navigate(`/`)}>
				<CardMedia
					component="img"
					image="/room.png"
					sx={{ maxHeight: '50%', maxWidth: '50%' }}
				/>
				<CardContent>
					<Typography gutterBottom variant="h4" component="div">
						Reservation+
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ReservationCard;
