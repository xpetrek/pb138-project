import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { addDays, startOfDay, subDays } from 'date-fns';
import { useEffect, useState } from 'react';

import RoomCardSearchResult from '../components/RoomCardSearchResult';
import useField from '../hooks/useField';
import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import reservationService from '../hooks/reservationService';
import roomService from '../hooks/roomService';
import { Order, RoomData } from '../utils/types';
import { LOCATIONS, ORDER_BY } from '../utils/constants';

const SearchRooms = () => {
	const t = useTranslation();
	usePageTitle('Add room');

	const [location, locationProps] = useField('');
	const [rooms, setRooms] = useState<RoomData[]>([]);
	const [orderBy, setOrderBy] = useState<Order>('price_asc');

	const handleSearch = () => {
		roomService
			.getByLocation(location)
			.then(response => response.json().then(res => setRooms(res)));
	};

	const changeOrder = (order: string) => {
		const copy = rooms;
		copy?.sort((a: RoomData, b: RoomData) => {
			if (orderBy === 'location_asc')
				return a.location.toLowerCase > b.location.toLowerCase ? 1 : -1;
			if (orderBy === 'location_desc')
				return a.location.toLowerCase < b.location.toLowerCase ? 1 : -1;
			if (order === 'price_desc') return b.pricePerDay - a.pricePerDay;
			if (order === 'price_asc') return a.pricePerDay - b.pricePerDay;
			return 0;
		});
		setRooms(copy);
		setOrderBy(order as Order);
	};

	return (
		<>
			<Box>
				<TextField label={t('location')} {...locationProps} select type="text">
					{LOCATIONS.map((location: string, i: number) => (
						<MenuItem key={i} value={location}>
							{location}
						</MenuItem>
					))}
				</TextField>
				<Button onClick={handleSearch}>{t('search')}</Button>
				<TextField label={t('orderBy')} value={orderBy} select type="text">
					{ORDER_BY.map((order: string, i: number) => (
						<MenuItem key={i} value={order} onClick={() => changeOrder(order)}>
							{order}
						</MenuItem>
					))}
				</TextField>
			</Box>
			{rooms !== undefined ? (
				<RoomCardSearchResult rooms={rooms} setRooms={setRooms} />
			) : null}
		</>
	);
};

export default SearchRooms;
