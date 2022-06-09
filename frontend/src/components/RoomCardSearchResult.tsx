import { Grid } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

import roomService from '../hooks/roomService';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { RoomData } from '../utils/types';

import AddCard from './AddCard';
import RoomCard from './RoomCard';

type Props = {
	rooms: RoomData[];
	isEditingPage?: boolean;
	setRooms: Dispatch<SetStateAction<RoomData[]>>;
};
const RoomCardSearchResult = ({
	rooms,
	isEditingPage = false,
	setRooms
}: Props) => {
	const { session } = useLoggedInUser();
	const [, setLoading] = useState<boolean>(true);

	const handleDelete = (id: number, index: number) => {
		setLoading(true);
		if (!session?.token) return;
		roomService.remove(id, session.token);
		const copy = rooms;
		copy.splice(index, 1);
		setRooms(copy);
		setLoading(false);
	};

	return (
		<Grid
			container
			spacing={1}
			alignItems="stretch"
			sx={{ aspectRatio: 1 / 1 }}
		>
			{isEditingPage ? (
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					lg={3}
					display="flex"
					alignContent="center"
				>
					<AddCard />
				</Grid>
			) : null}
			{rooms.map((obj, i) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={i} display="flex">
					<RoomCard
						room={obj}
						handleDelete={handleDelete}
						index={i}
						canDelete={isEditingPage && obj.ownerId === session?.user.id}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default RoomCardSearchResult;
