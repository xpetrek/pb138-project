import { Grid } from '@mui/material';

import { RoomData } from '../utils/types';

import DatePicker from './DatePicker';
import RoomInfo from './RoomInfo';

type Props = {
	room: RoomData;
	handleRoomReservation: (from: Date, to: Date) => void;
	hasOwnership?: boolean;
};
const RoomReservation = ({
	room,
	handleRoomReservation,
	hasOwnership = true
}: Props) => {
	const consol = '';
	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={8} md={8} lg={8}>
				<RoomInfo {...room} />
			</Grid>
			{hasOwnership ? null : (
				<Grid item xs={12} sm={4} md={4} lg={4}>
					<DatePicker
						price={room.pricePerDay}
						handleRoomReservation={handleRoomReservation}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default RoomReservation;
