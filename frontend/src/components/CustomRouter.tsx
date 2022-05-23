import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const CustomRouter = () => (
	<Routes>
		<Route path="/" element={<Home language='en'/>} />
		<Route path="/login" element={<Login />} />
		<Route path="/notFound" element={<NotFound />} />
	</Routes>
);

export default CustomRouter;
