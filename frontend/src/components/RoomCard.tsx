import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Button
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
	console.log(room.pictures);
	return (
		<Card
			onMouseOver={() => setFocused(true)}
			onMouseLeave={() => setFocused(false)}
			sx={{ display: 'grid', width: '100%', objectFit: 'contain' }}
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
						<ClearIcon />
					</Button>
				) : null}
			</Box>
			<CardActionArea
				className="room-card--area"
				onClick={() => navigate(`/rooms/${room.id}`)}
			>
				<CardMedia
					className="room-card--picture"
					component="img"
					image={
						room.pictures[0].url !== '' ? room.pictures[0].url : '/room.png'
					}
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
