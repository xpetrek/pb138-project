import { useState } from 'react';

const AddRoom = () => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');

	return <div>Hello add reservation</div>;
};

export default AddRoom;
