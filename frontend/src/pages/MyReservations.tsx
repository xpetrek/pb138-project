import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';

import RoomCardSearchResult from '../components/RoomCardSearchResult';
import reservationService from '../hooks/reservationService';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { RoomData } from '../utils/types';

const MyReservations = () => {
	const { session, error, login, logout } = useLoggedInUser();
	const [loading, setLoading] = useState<boolean>(true);
	const [rooms, setRooms] = useState<RoomData[]>();

	useEffect(() => {
		setLoading(true);
		console.log('mounted reservation hook');

		reservationService
			.get()
			.then(response =>
				response.json().then(res => {
					console.log(res);
				})
			)
			.finally(() => setLoading(false));
		console.log(rooms);
		setLoading(false);
	}, []);

	console.log(rooms);

	return rooms !== undefined ? (
		<RoomCardSearchResult rooms={rooms} hasOwnership />
	) : null;
};

export default MyReservations;
