import {
	createContext,
	FC,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';

import { BACKEND_URL } from '../utils/constants';

type UserData = {
	email: string;
	id: number;
	name: string;
};

type SessionData = {
	user: UserData;
	token?: string;
};

type AuthContextType = {
	session?: SessionData;
	loading: boolean;
	error?: Error;
	login: (email: string, password: string) => void;
	logout: () => void;
	signUp: (name: string, email: string, password: string) => void;
	// refresh: () => void;
};

const UserContext = createContext<AuthContextType>({} as AuthContextType);
type Props = {
	children?: React.ReactNode;
};

export const UserProvider: FC<Props> = ({ children }) => {
	const [session, setSession] = useState<SessionData | undefined>(undefined);
	const [error, setError] = useState<Error>();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		console.log('session after loading change');
		console.log(session);
	}, [session]);

	const signUp = (name: string, email: string, password: string) => {
		setLoading(true);
		fetch(`${BACKEND_URL}/signup`, {
			method: 'POST',
			body: JSON.stringify({ name, email, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				response.json().then(res => setSession({ ...res }));
			})
			.catch(err => setError(err))
			.finally(() => setLoading(false));
	};

	const login = (email: string, password: string) => {
		setLoading(true);
		fetch(`${BACKEND_URL}/login`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				response.json().then(res => {
					const copy: SessionData = {
						user: {
							email,
							id: res.userId,
							name: ''
						},
						token: res.token
					};
					setSession(copy);
					console.log('copy');
					console.log(copy);
					console.log(session);
				});
			})
			.catch(err => setError(err))
			.finally(() => setLoading(false));
	};

	const logout = () => {
		console.log('logout!');
		setSession(undefined);
	};

	const memoedValue = useMemo(
		() => ({
			session,
			loading,
			error,
			login,
			logout,
			signUp
		}),
		[session, loading, error]
	);

	return (
		<UserContext.Provider value={memoedValue}>{children}</UserContext.Provider>
	);
};

// Hook providing logged in user information
const useLoggedInUser = () => useContext(UserContext);

export default useLoggedInUser;
