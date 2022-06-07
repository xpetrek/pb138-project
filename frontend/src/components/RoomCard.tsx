import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	makeStyles,
	Button,
	CardHeader
} from '@mui/material';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '../hooks/useTranslation';
import { RoomData } from '../utils/types';

type Props = {
	room: RoomData;
	index: number;
	canDelete: boolean;
	handleDelete: (id: number, index: number) => void;
};

const RoomCard = ({ room, index, canDelete, handleDelete }: Props) => {
	const navigate = useNavigate();
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
				{canDelete ? (
					<Button
						color="primary"
						variant="contained"
						onClick={() => handleDelete(room.id, index)}
					>
						Delete
					</Button>
				) : null}
			</Box>
			<CardActionArea onClick={() => navigate(`/rooms/${room.id}`)}>
				<CardMedia
					component="img"
					image={
						room.pictures.length !== 0 ? room.pictures[0].url : '/room.png'
					}
					sx={{ maxHeight: '50%', maxWidth: '50%' }}
				/>
				<CardContent>
					<Typography gutterBottom variant="h4" component="div">
						{room.name}
					</Typography>
					<Typography gutterBottom variant="h5" component="div">
						{room.location}
					</Typography>
					<Typography gutterBottom variant="h6" component="div">
						{room.pricePerDay},-CZK
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default RoomCard;
