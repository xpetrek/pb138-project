import { Box, Typography } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import { RoomData } from '../utils/types';

const RoomInfo = (room: RoomData) => {
	const t = useTranslation();

	return (
		<>
			<Box
				sx={{
					width: '50%',
					display: 'block',
					marginLeft: 'auto',
					minWidth: '30remm',
					marginRight: 'auto'
				}}
				component="img"
				alt="Bad photo"
				src={room.pictures[0].url !== '' ? room.pictures[0].url : '/room.png'}
			/>
			<Typography
				gutterBottom
				variant="h4"
				component="div"
				display="flex"
				justifyContent="center"
			>
				{room.name}
			</Typography>
			<Typography
				gutterBottom
				variant="h5"
				component="div"
				display="flex"
				justifyContent="center"
			>
				{room.location}
			</Typography>
			<Typography
				gutterBottom
				variant="body1"
				component="div"
				display="flex"
				justifyContent="center"
			>
				{room.description}
			</Typography>
			<Typography
				gutterBottom
				variant="h6"
				component="div"
				display="flex"
				justifyContent="center"
			>
				{t('price')} {room.pricePerDay} CZK
			</Typography>
		</>
	);
};
export default RoomInfo;
