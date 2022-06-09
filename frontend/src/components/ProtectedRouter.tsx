import { Navigate } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';

type Props = {
	children?: JSX.Element;
	redirectPath?: string;
};

const ProtectedRoute = ({ children, redirectPath }: Props) => {
	const { session } = useLoggedInUser();
	if (session?.token)
		return children ?? <Navigate to={redirectPath ?? '/'} replace />;
	return <Navigate to={redirectPath ?? '/'} replace />;
};

export default ProtectedRoute;
