import { useEffect, useState } from 'react';

import ReservationCardSearchResult from '../components/ReservationCardSearchResult';
import reservationService from '../hooks/reservationService';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { ReservationData } from '../utils/types';

const MyReservations = () => {
	const { session } = useLoggedInUser();
	const [, setLoading] = useState<boolean>(true);
	const [reservations, setReservations] = useState<ReservationData[]>([]);

	useEffect(() => {
		setLoading(true);
		if (!session) return;

		reservationService
			.getByUser(session?.user.id)
			.then(response => response.json().then(res => setReservations(res)))
			.finally(() => setLoading(false));
		console.log(reservations);
		setLoading(false);
	}, []);

	return reservations !== undefined ? (
		<ReservationCardSearchResult
			reservations={reservations}
			setReservations={setReservations}
		/>
	) : null;
};

export default MyReservations;
