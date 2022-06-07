import { FC } from 'react';
import {
	Routes,
	Route,
	NavLink,
	Navigate,
	useNavigate
} from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';

type Props = {
	children?: React.ReactNode;
	path: string;
};

const ProtectedRoute: FC<Props> = ({ children, path }) => {
	const { session } = useLoggedInUser();

	return (
		<Routes>
			<Route path={path}>
				{session?.token ? children : <Navigate to="/home" replace />}
			</Route>
		</Routes>
	);
};

export default ProtectedRoute;
