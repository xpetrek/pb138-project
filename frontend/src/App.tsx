import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import { LanguageProvider } from './hooks/useTranslation';
import theme from './utils/theme';

const App = () => (
	<LanguageProvider>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />
				<Layout>
					<Routes />
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	</LanguageProvider>
);
export default App;
