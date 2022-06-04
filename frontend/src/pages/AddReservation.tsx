import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { Box, TextField, Button } from '@mui/material';
import { addDays, startOfDay, subDays } from 'date-fns';
import { useState } from 'react';

import useField from '../hooks/useField';
import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import reservationService from '../hooks/reservationService';
import roomService from '../hooks/roomService';

const AddReservation = () => {
	const t = useTranslation();
	usePageTitle('Add room');

	const [name, nameProps] = useField('');
	const [description, descriptionProps] = useField('');
	const [location, locationProps] = useField('');

	const [datePickerState, setDatePickerState] = useState([
		{
			startDate: subDays(new Date(), 0),
			endDate: addDays(new Date(), 2),
			key: 'selection'
		}
	]);

	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	const handleOnChange = (ranges: RangeKeyDict) => {
		const { selection } = ranges;
		setDatePickerState([
			{
				startDate: selection.startDate ?? new Date(),
				endDate: selection.endDate ?? new Date(),
				key: selection.key ?? 'selection'
			}
		]);
	};

	const handleSearch = () => {
		console.log(datePickerState[0].startDate.toISOString());
		console.log(datePickerState[0].endDate.toISOString());
		roomService.get(
			datePickerState[0].endDate.toISOString(),
			datePickerState[0].startDate.toLocaleDateString('en-CA'),
			location
		);
	};

	return (
		<>
			<Box>
				<TextField label={t('location')} {...locationProps} type="text" />
				<DateRangePicker
					onChange={handleOnChange}
					moveRangeOnFirstSelection={false}
					ranges={datePickerState}
					direction="vertical"
				/>

				<Button onClick={handleSearch}>{t('search')}</Button>
			</Box>
			<Box>Search results will occur here</Box>
		</>
	);
};

export default AddReservation;
