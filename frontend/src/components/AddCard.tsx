import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from '../hooks/useTranslation';

const AddCard = () => {
	const navigate = useNavigate();
	const t = useTranslation();

	return (
		<Card sx={{ display: 'grid', width: '100%' }}>
			<CardActionArea onClick={() => navigate('/addRoom')}>
				<CardMedia
					className="add-card--picture"
					component="img"
					image="/plus.png"
				/>
			</CardActionArea>
		</Card>
	);
};

export default AddCard;
