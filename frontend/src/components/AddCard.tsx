import { Card, CardActionArea, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddCard = () => {
	const navigate = useNavigate();

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
