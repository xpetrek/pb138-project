import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { Range } from 'react-date-range';

import reservationService from '../hooks/reservationService';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { ReservationData, RoomData } from '../utils/types';

import DatePicker from './DatePicker';
import RoomInfo from './RoomInfo';

type Props = {
	room: RoomData;
	hasOwnership?: boolean;
};
const RoomReservation = ({ room, hasOwnership = true }: Props) => {
	const { session } = useLoggedInUser();

	const [nonUserReservationDates, setNonUserReservationDates] = useState<
		Range[]
	>([]);
	const [userReservationDates, setUserReservationDates] = useState<Range[]>([]);
	const [, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>();

	useEffect(() => {
		setLoading(true);
		reservationService
			.get(undefined, room.id, undefined, undefined)
			.then(response =>
				response.json().then(res => {
					const reservationData = [...res];
					setNonUserReservationDates(
						transformNonUserReservationDatesForCalendar(reservationData)
					);
					setUserReservationDates(
						transformUserReservationDatesForCalendar(reservationData)
					);
				})
			)
			.finally(() => setLoading(false));
	}, []);

	const handleRoomReservation = (from: Date, to: Date) => {
		setLoading(true);
		console.log('Reservation sent!');
		from.setHours(15);
		to.setHours(10);
		reservationService
			.create(
				from.toISOString().split('T')[0],
				to.toISOString().split('T')[0],
				room.id,
				session?.user.id ?? 1,
				session?.token ?? ''
			)
			.then(async response => {
				if (response.status !== 201) {
					console.log('!201');
					response.json().then(res => {
						console.log(res);
						setErrorMessage(res);
					});
				}
			})
			.catch(err => {
				console.log('err');
				console.log(err);
				setErrorMessage(err.errorMessage);
			})
			.finally(() => setLoading(false));
	};

	const transformReservationDatesForCalendar = (
		reservations: ReservationData[],
		color?: string
	) => {
		const result = reservations.map(obj => ({
			startDate: new Date(obj.from),
			endDate: new Date(obj.to),
			key: 'booked',
			color: color ? color : 'grey',
			showDateDisplay: false,
			disabled: true
		}));
		return result;
	};

	const transformUserReservationDatesForCalendar = (
		reservations: ReservationData[]
	) => {
		const userReservations = reservations.filter(
			obj => obj.userId === session?.user.id
		);
		return transformReservationDatesForCalendar(userReservations, 'blue');
	};

	const transformNonUserReservationDatesForCalendar = (
		reservations: ReservationData[]
	) => {
		const nonUserReservations = reservations.filter(
			obj => obj.userId !== session?.user.id
		);
		return transformReservationDatesForCalendar(nonUserReservations, 'red');
	};

	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={8} md={8} lg={8}>
					<RoomInfo {...room} />
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={4}>
					<DatePicker
						price={room.pricePerDay}
						handleRoomReservation={handleRoomReservation}
						userReservationDates={userReservationDates}
						nonUserReservationDates={nonUserReservationDates}
					/>
				</Grid>
			</Grid>
			{errorMessage ? errorMessage : null}
		</>
	);
};

export default RoomReservation;
