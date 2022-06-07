import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Box } from '@mui/material';

// import useLoggedInUser from '../../hooks/useLoggedInUser';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitch from '../components/LanguageSwitch';
import useLoggedInUser from '../hooks/useLoggedInUser';

type Props = {
	children?: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
	const { session, error, login, logout } = useLoggedInUser();
	const t = useTranslation();
	return (
		<>
			<AppBar position="fixed">
				<Container maxWidth="lg">
					<Toolbar disableGutters sx={{ gap: 2 }}>
						<Button color="secondary" component={Link} to="/">
							Home
						</Button>
						<Button color="secondary" component={Link} to="/addRoom">
							AddRoom
						</Button>
						<Button color="secondary" component={Link} to="/searchRooms">
							SearchRooms
						</Button>
						<Button color="secondary" component={Link} to="/myRooms">
							MyRooms
						</Button>
						<Button color="secondary" component={Link} to="/myReservations">
							MyReservations
						</Button>
						<Box sx={{ flexGrow: 1 }} />
						{!session?.user ? (
							<>
								<Button color="secondary" component={Link} to="/login">
									Login
								</Button>
								<Button color="secondary" component={Link} to="/signUp">
									SignUp
								</Button>
							</>
						) : (
							<Button color="secondary" onClick={logout}>
								Logout
							</Button>
						)}
						<LanguageSwitch />
					</Toolbar>
				</Container>
			</AppBar>
			<Container
				maxWidth="lg"
				component="main"
				sx={{
					display: 'inherit',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					pt: 10,
					gap: 2
				}}
			>
				{children}
			</Container>
		</>
	);
};
export default Layout;
