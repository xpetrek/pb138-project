import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';

import RoomCardSearchResult from '../components/RoomCardSearchResult';
import roomService from '../hooks/roomService';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { RoomData } from '../utils/types';

const MyRooms = () => {
	const { session, error, login, logout } = useLoggedInUser();
	const [loading, setLoading] = useState<boolean>(true);
	const [rooms, setRooms] = useState<RoomData[]>();

	console.log('session');
	console.log(session);
	console.log(error);
	useEffect(() => {
		setLoading(true);
		roomService
			.getByUser(session?.user.id ?? -1)
			.then(response =>
				response.json().then(res => {
					console.log(res);
					setRooms(res);
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

export default MyRooms;
