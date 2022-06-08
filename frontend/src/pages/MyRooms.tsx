import { useEffect, useState } from 'react';

import RoomCardSearchResult from '../components/RoomCardSearchResult';
import roomService from '../hooks/roomService';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { RoomData } from '../utils/types';

const MyRooms = () => {
	const { session } = useLoggedInUser();
	const [, setLoading] = useState<boolean>(true);
	const [rooms, setRooms] = useState<RoomData[]>([]);
	useEffect(() => {
		setLoading(true);
		roomService
			.getByUser(session?.user.id ?? -1)
			.then(response =>
				response.json().then(res => {
					setRooms(res);
				})
			)
			.finally(() => setLoading(false));
		setLoading(false);
	}, []);

	return rooms !== undefined ? (
		<RoomCardSearchResult rooms={rooms} isEditingPage setRooms={setRooms} />
	) : null;
};

export default MyRooms;
