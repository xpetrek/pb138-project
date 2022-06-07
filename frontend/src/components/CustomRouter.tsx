import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AddRoom from '../pages/AddRoom';
import SearchRooms from '../pages/SearchRooms';
import ShowRoom from '../pages/ShowRoom';
import MyRooms from '../pages/MyRooms';
import MyReservations from '../pages/MyReservations';
import NotFound from '../pages/NotFound';

import ProtectedRoute from './ProtectedRouter';

const CustomRouter = () => (
	<Routes>
		<Route path="/" element={<Home language="en" />} />
		<Route path="/login" element={<Login />} />
		<Route path="/signUp" element={<SignUp />} />
		<Route path="/addRoom" element={<AddRoom />} />
		<Route path="/searchRooms" element={<SearchRooms />} />
		<Route path="/myRooms" element={<MyRooms />} />
		<Route path="/myReservations" element={<MyReservations />} />
		{/* <ProtectedRoute path="/rooms/:id">
			<ShowRoom />
		</ProtectedRoute> */}
		<Route path="/rooms/:id" element={<ShowRoom />} />
		<Route path="/*" element={<NotFound />} />
	</Routes>
);

export default CustomRouter;
