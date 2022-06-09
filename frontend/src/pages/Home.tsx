import { Typography } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
type Props = {
	language: string;
};

const Home = ({ language }: Props) => {
	const t = useTranslation();
	return (
		<>
			<Typography
				className="home--title"
				variant="h1"
				fontWeight="bolder"
				fontSize="2.5rem"
			>
				{t('title')}
			</Typography>
			<hr />
			<Typography
				className="home--line"
				variant="h2"
				fontWeight="bolder"
				fontSize="2rem"
			>
				{t('introductionFirstLine')}
			</Typography>
			<Typography
				className="home--line"
				variant="h2"
				fontWeight="bolder"
				fontSize="2rem"
			>
				{t('introductionSecondLine')}
			</Typography>
			<Typography
				className="home--line"
				variant="h2"
				fontWeight="bolder"
				fontSize="2rem"
			>
				{t('introductionThirdLine')}
			</Typography>
		</>
	);
};

export default Home;
