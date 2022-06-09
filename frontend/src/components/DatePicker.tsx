import { Button, Grid, Typography } from '@mui/material';
import { subDays, addDays } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker, RangeKeyDict, Range } from 'react-date-range';

import { useTranslation } from '../hooks/useTranslation';

type Props = {
	price: number;
	userReservationDates: Range[];
	nonUserReservationDates: Range[];
	handleRoomReservation: (from: Date, to: Date) => void;
};
const DatePicker = ({
	price,
	userReservationDates,
	nonUserReservationDates,
	handleRoomReservation
}: Props) => {
	const t = useTranslation();

	const [numberOfNights, setNumberOfNights] = useState<number>(0);
	const [datePickerState, setDatePickerState] = useState({
		startDate: subDays(new Date(), 0),
		endDate: addDays(new Date(), 1),
		key: 'selection',
		color: 'blue'
	});

	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	const handleOnChange = (ranges: RangeKeyDict) => {
		console.log(ranges);
		const selection = ranges.selection;
		setDatePickerState({
			startDate: selection.startDate ?? subDays(new Date(), 0),
			endDate: selection.endDate ?? addDays(new Date(), 0),
			key: 'selection',
			color: 'blue'
		});
		const nightCounter = daysBetween(
			selection.startDate ?? new Date(),
			selection.endDate ?? new Date()
		);
		setNumberOfNights(nightCounter);
	};

	const daysBetween = (startDate: Date, endDate: Date) => {
		const diffInMs = Math.abs(Number(endDate) - Number(startDate));
		return diffInMs / (1000 * 60 * 60 * 24);
	};

	return (
		<Grid container direction="column" justifyContent="center">
			<Grid item display="flex" justifyContent="center">
				<DateRangePicker
					staticRanges={[]}
					inputRanges={[]}
					onChange={handleOnChange}
					ranges={[
						datePickerState,
						...nonUserReservationDates,
						...userReservationDates
					]}
					dateDisplayFormat="MM-dd-yyyy"
					direction="vertical"
				/>
			</Grid>
			<Grid item display="flex" justifyContent="center">
				<Typography>{price * numberOfNights},- CZK</Typography>
			</Grid>
			<Grid item display="flex" justifyContent="center">
				<Button
					variant="contained"
					onClick={() =>
						handleRoomReservation(
							datePickerState?.startDate,
							datePickerState?.endDate
						)
					}
				>
					{t('submit')}
				</Button>
			</Grid>
		</Grid>
	);
};

export default DatePicker;
