import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AddRoom from '../pages/AddRoom';
import AddReservation from '../pages/AddReservation';
import NotFound from '../pages/NotFound';

const CustomRouter = () => (
	<Routes>
		<Route path="/" element={<Home language="en" />} />
		<Route path="/login" element={<Login />} />
		<Route path="/signUp" element={<SignUp />} />
		<Route path="/addRoom" element={<AddRoom />} />
		<Route path="/AddReservation" element={<AddReservation />} />
		<Route path="/notFound" element={<NotFound />} />
	</Routes>
);

export default CustomRouter;
