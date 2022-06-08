import { Typography } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
type Props = {
	language: string;
};

const Home = ({ language }: Props) => {
	const t = useTranslation();
	return (
		<>
			<Typography variant="h2" fontWeight="bolder" fontSize="2rem">
				{t('introductionFirstLine')}
			</Typography>
			<Typography variant="h2" fontWeight="bolder" fontSize="2rem">
				{t('introductionSecondLine')}
			</Typography>
			<Typography variant="h2" fontWeight="bolder" fontSize="2rem">
				{t('introductionThirdLine')}
			</Typography>
		</>
	);
};

export default Home;
