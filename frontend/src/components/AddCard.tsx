import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '../hooks/useTranslation';

const AddCard = () => {
	const navigate = useNavigate();
	const t = useTranslation();

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
						{t('addRoom')}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default AddCard;
