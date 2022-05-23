import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Palette {
		disabledButton?: string;
	}
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface PaletteOptions {
		disabledButton?: string;
	}
}

const theme = createTheme({
	palette: {
		primary: { main: '#f2d45c' },
		secondary: { main: '#black' },
		disabledButton: '#red'
	}
});

export default theme;
