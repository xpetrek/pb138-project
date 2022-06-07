import { Box, Grid } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import { RoomData } from '../utils/types';

import AddCard from './AddCard';
import RoomCard from './RoomCard';

type Props = {
	rooms: RoomData[];
	hasOwnership?: boolean;
};
const RoomCardSearchResult = ({ rooms, hasOwnership = false }: Props) => {
	const t = useTranslation();
	console.log(rooms);
	return (
		<Grid
			container
			spacing={1}
			alignItems="stretch"
			sx={{ aspectRatio: 1 / 1 }}
		>
			{hasOwnership ? (
				<Grid item xs={12} sm={6} md={4} lg={3} display="flex">
					<AddCard />
				</Grid>
			) : null}
			{rooms.map((obj, i) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={i} display="flex">
					<RoomCard {...obj} />
				</Grid>
			))}
		</Grid>
	);
};

export default RoomCardSearchResult;
