import { Box, Typography } from '@mui/material';

import { RoomData } from '../utils/types';

const RoomInfo = (room: RoomData) => (
	<>
		<Box
			sx={{
				height: '60%',
				width: '60%'
			}}
			component="img"
			alt="Bad photo"
			src={room.pictures.length > 0 ? room.pictures[0].url : '/room.png'}
		/>
		<Typography gutterBottom variant="h4" component="div">
			{room.name}
		</Typography>
		<Typography gutterBottom variant="h5" component="div">
			{room.location}
		</Typography>
		<Typography gutterBottom variant="body1" component="div">
			{room.description}
		</Typography>
		<Typography gutterBottom variant="h6" component="div">
			{room.pricePerDay} CZK
		</Typography>
	</>
);
export default RoomInfo;
