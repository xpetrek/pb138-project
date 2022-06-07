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
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '../hooks/useTranslation';

const AddCard = () => {
	const navigate = useNavigate();

	return (
		<Card>
			<CardActionArea onClick={() => navigate('/addRoom')}>
				<CardMedia
					component="img"
					image="/logo512.png"
					sx={{ maxHeight: '50%', maxWidth: '50%' }}
				/>
				<CardContent>
					<Typography gutterBottom variant="h4" component="div">
						Add room
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default AddCard;
