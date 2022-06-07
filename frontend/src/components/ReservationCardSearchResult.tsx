import { Box, Grid } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

import reservationService from '../hooks/reservationService';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useTranslation } from '../hooks/useTranslation';
import { ReservationData } from '../utils/types';

import AddCard from './AddCard';
import ReservationCard from './ReservationCard';

type Props = {
	reservations: ReservationData[];
	setReservations: Dispatch<SetStateAction<ReservationData[]>>;
};
const RoomCardSearchResult = ({ reservations, setReservations }: Props) => {
	const t = useTranslation();
	const { session } = useLoggedInUser();
	const [loading, setLoading] = useState<boolean>(true);

	const handleDelete = (id: number, index: number) => {
		setLoading(true);
		if (!session?.token) return;
		reservationService.remove(id, session.token);
		const copy = reservations;
		copy.splice(index, 1);
		setReservations(copy);
		setLoading(false);
	};

	return (
		<Grid
			container
			spacing={1}
			alignItems="stretch"
			sx={{ aspectRatio: 1 / 1 }}
		>
			{reservations.map((obj, i) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={i} display="flex">
					<ReservationCard
						reservation={obj}
						handleDelete={handleDelete}
						index={i}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default RoomCardSearchResult;
