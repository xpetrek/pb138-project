import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	Typography
} from '@mui/material';

// import useLoggedInUser from '../../hooks/useLoggedInUser';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitch from '../components/LanguageSwitch';
import useLoggedInUser from '../hooks/useLoggedInUser';

type Props = {
	children?: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
	const { session, logout } = useLoggedInUser();
	const t = useTranslation();
	const navigate = useNavigate();

	return (
		<>
			<AppBar position="fixed">
				<Container maxWidth="lg">
					<Toolbar disableGutters sx={{ gap: 2 }}>
						<Button color="secondary" component={Link} to="/">
							{t('home')}
						</Button>
						<Button color="secondary" component={Link} to="/searchRooms">
							{t('searchRooms')}
						</Button>
						<Button color="secondary" component={Link} to="/myRooms">
							{t('myRooms')}
						</Button>
						<Button color="secondary" component={Link} to="/myReservations">
							{t('myReservations')}
						</Button>
						<Box sx={{ flexGrow: 1 }} />
						{!session?.token ? (
							<>
								<Button color="secondary" component={Link} to="/login">
									{t('login')}
								</Button>
								<Button color="secondary" component={Link} to="/signUp">
									{t('signUp')}
								</Button>
							</>
						) : (
							<>
								<Typography>
									{t('welcome')} {session.user.name}!
								</Typography>
								<Button
									color="secondary"
									onClick={() => {
										logout();
										navigate('/');
									}}
								>
									{t('logout')}
								</Button>
							</>
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
