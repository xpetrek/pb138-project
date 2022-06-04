import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import CustomRouter from './components/CustomRouter';
import { LanguageProvider } from './hooks/useTranslation';
import theme from './utils/theme';
import { UserProvider } from './hooks/useLoggedInUser';

const App = () => (
	<UserProvider>
		<LanguageProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<CssBaseline />
					<Layout>
						<CustomRouter />
					</Layout>
				</BrowserRouter>
			</ThemeProvider>
		</LanguageProvider>
	</UserProvider>
);
export default App;
