import { Box, IconButton } from '@mui/material';
import Flag from 'react-flagkit';

import { useLanguage, useTranslation } from '../hooks/useTranslation';

type Props = {
	onClick: () => void;
	active?: boolean;
	title: string;
	country: string;
};

const FlagButton = ({ onClick, title, active, country }: Props) => (
	<IconButton
		onClick={onClick}
		size="small"
		title={title}
		sx={{
			filter: !active ? 'saturate(0.1)' : undefined
		}}
	>
		<Flag country={country} size={20} />
	</IconButton>
);

const LanguageSwitch = () => {
	const [language, setLanguage] = useLanguage();
	const t = useTranslation();
	return (
		<Box>
			<FlagButton
				onClick={() => setLanguage('en')}
				active={language === 'en'}
				title={t('en')}
				country="GB"
			/>
			<FlagButton
				onClick={() => setLanguage('sk')}
				active={language === 'sk'}
				title={t('sk')}
				country="SK"
			/>
		</Box>
	);
};

export default LanguageSwitch;
