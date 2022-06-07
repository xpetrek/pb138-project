import { Button, Grid, Typography } from '@mui/material';
import { subDays, addDays } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';

type Props = {
	price: number;
	handleRoomReservation: (from: Date, to: Date) => void;
};
const DatePicker = ({ price, handleRoomReservation }: Props) => {
	const [numberOfNights, setNumberOfNights] = useState<number>(0);
	const [datePickerState, setDatePickerState] = useState([
		{
			startDate: subDays(new Date(), 0),
			endDate: addDays(new Date(), 2),
			key: 'selection'
		},
		{
			startDate: subDays(new Date(), -10),
			endDate: addDays(new Date(), -11),
			color: 'grey',
			disabled: true,
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
		<Grid container direction="column">
			<Grid item>
				<DateRangePicker
					staticRanges={[]}
					inputRanges={[]}
					onChange={handleOnChange}
					ranges={datePickerState}
					dateDisplayFormat="MM-dd-yyyy"
					direction="vertical"
				/>
			</Grid>
			<Grid item>
				<Typography>
					{price} * {numberOfNights} = {price * numberOfNights}
				</Typography>
			</Grid>
			<Grid item>
				<Button
					onClick={() =>
						handleRoomReservation(
							datePickerState[0].startDate,
							datePickerState[0].endDate
						)
					}
				>
					Submit
				</Button>
			</Grid>
		</Grid>
	);
};

export default DatePicker;
