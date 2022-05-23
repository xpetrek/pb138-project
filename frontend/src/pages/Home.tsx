import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type Props = {
	language: string;
};

const Home = ({ language }: Props) => {

	return (
		<>
			<Typography variant="h1" fontWeight="bolder">
				Air bnb!
			</Typography>
		</>
	);
};

export default Home;
