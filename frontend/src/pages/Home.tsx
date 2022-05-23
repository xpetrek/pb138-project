import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {
	language: string;
};

const Home = ({ language }: Props) => {
	const tmp = '';
	return (
		<Typography variant="h1" fontWeight="bolder">
			Looking for saving some buck and renting room from locals? Are you living
			in Brno and want to cut the middle man and share
		</Typography>
	);
};

export default Home;
