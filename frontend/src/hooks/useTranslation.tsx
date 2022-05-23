import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState
} from 'react';

import localization from '../localization';

type Languages = keyof typeof localization;
type LocalizationKeys = keyof typeof localization[Languages];
type LanguageState = [Languages, Dispatch<SetStateAction<Languages>>];

const LanguageContext = createContext<LanguageState>(undefined as never);

// Wrapped context provider
type Props = {
	children?: React.ReactNode;
};

export const LanguageProvider: FC<Props> = ({ children }) => {
	// We can improve this by saving and loading the initial state from local storage
	const languageState = useState<Languages>('en');
	return (
		<LanguageContext.Provider value={languageState}>
			{children}
		</LanguageContext.Provider>
	);
};

// Only used by language switch
export const useLanguage = () => useContext(LanguageContext);

// Convenience hook for localizing translations
export const useTranslation = () => {
	const [language] = useContext(LanguageContext);
	return (key: LocalizationKeys) => localization[language][key];
};
