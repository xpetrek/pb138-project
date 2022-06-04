import { BACKEND_URL } from '../utils/constants';

const create = (
	name: string,
	description: string,
	location: string,
	pricePerDay: number
) => {
	fetch(`${BACKEND_URL}/rooms`, {
		method: 'POST',
		body: JSON.stringify({
			name,
			description,
			location,
			pricePerDay,
			ownerId: 1
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		console.log(response.json().then(res => console.log(res)));
	});
};

const get = (from: string, to: string, location: string) => {
	fetch(`${BACKEND_URL}/rooms`, {
		method: 'POST',
		body: JSON.stringify({ from, to, location }),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		console.log(response.json());
	});
};

const getById = (id: number) => {
	fetch(`${BACKEND_URL}/rooms/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		console.log(response.json());
	});
};

const remove = (id: number) => {
	let returnResponse;
	fetch(`${BACKEND_URL}/rooms/${id}`, {
		method: 'POST',
		body: JSON.stringify({ id }),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		returnResponse = response;
	});
	return returnResponse;
};

const roomService = {
	create,
	get,
	getById,
	remove
};

export default roomService;
