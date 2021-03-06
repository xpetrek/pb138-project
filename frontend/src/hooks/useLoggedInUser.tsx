import { createContext, FC, useContext, useMemo, useState } from 'react';

import { BACKEND_URL } from '../utils/constants';
import { SessionData } from '../utils/types';

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

	const signUp = (name: string, email: string, password: string) => {
		setLoading(true);
		fetch(`${BACKEND_URL}/signup`, {
			method: 'POST',
			body: JSON.stringify({ name, email, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(() => login(email, password))
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
			.then(async response => {
				response.json().then(res => {
					if (response.ok) {
						const copy: SessionData = {
							user: res.user,
							token: res.accessToken
						};
						setSession(copy);
					} else {
						setSession(undefined);
						setError(new Error(res.message));
					}
				});
			})
			.catch(err => setError(err))
			.finally(() => {
				setLoading(false);
			});
	};

	const logout = () => {
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
