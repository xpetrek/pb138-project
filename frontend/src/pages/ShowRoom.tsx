import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RoomData } from '../utils/types';
import usePageTitle from '../hooks/usePageTitle';
import roomService from '../hooks/roomService';
import RoomReservation from '../components/RoomReservation';
import reservationService from '../hooks/reservationService';
import useLoggedInUser from '../hooks/useLoggedInUser';

const ShowRoom = () => {
	usePageTitle('Room');
	const { session, error, login, logout } = useLoggedInUser();

	const { id } = useParams();
	const [room, setRoom] = useState<RoomData>({
		description: '',
		id: 0,
		location: '',
		name: '',
		ownerId: 0,
		pictures: [{ url: '', label: '' }],
		pricePerDay: 0
	});
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(true);
		roomService
			.getById(Number.parseInt(id ?? ''))
			.then(response => response.json().then(res => setRoom({ ...res })))
			.finally(() => setLoading(false));
		console.log(room);
	}, []);

	return loading ? (
		<>Loading!</>
	) : (
		<RoomReservation
			room={room}
			hasOwnership={session?.user.id === room.ownerId}
		/>
	);
};

export default ShowRoom;
