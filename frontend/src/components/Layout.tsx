import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Box } from '@mui/material';

// import useLoggedInUser from '../../hooks/useLoggedInUser';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitch from '../components/LanguageSwitch';

type Props = {
	children?: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
	const t = useTranslation();
	return (
		<>
			<AppBar position="fixed">
				<Container maxWidth="lg">
					<Toolbar disableGutters sx={{ gap: 2 }}>
						<Button color="secondary" component={Link} to="/">
							Home
						</Button>
						<Box sx={{ flexGrow: 1 }} />
						<Button color="secondary" component={Link} to="/login">
							Login
						</Button>
						<LanguageSwitch />
						{/* {!user ? (
							<Button color="secondary" component={Link} to="/about">
								Login
							</Button>
						) : (
							<Button color="secondary" onClick={signOut}>
								Logout
							</Button>
						)
						} */}
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
