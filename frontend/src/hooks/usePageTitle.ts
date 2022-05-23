import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | PB-138 AirBnB`;
	}, [title]);
};

export default usePageTitle;
