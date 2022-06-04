import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

type RoomGallery = {
	url: string;
	label: string;
};

type Props = {
	images: {
		url: string;
		label: string;
	}[];
	setImages: React.Dispatch<
		React.SetStateAction<
			{
				url: string;
				label: string;
			}[]
		>
	>;
};
const ImageForm = ({ images, setImages }: Props) => {
	return (
		<Box>
			{images.map((obj, i) => (
				<>
					<TextField
						key={i}
						label="Image URL"
						value={obj.url}
						onChange={e => {
							setGallery([{ url: e.target.value, label: gallery[0].label }]);
						}}
					/>
					<TextField
						key={i}
						label="Image label"
						value={obj.label}
						onChange={e => {
							setGallery([{ url: gallery[0].url, label: e.target.value }]);
						}}
					/>
					<Box
						sx={{
							height: '50%',
							width: '50%'
						}}
						component="img"
						alt="Bad photo"
						src={obj.url}
					/>
				</>
			))}
		</Box>
	);
};

export default ImageForm;
