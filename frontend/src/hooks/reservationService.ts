import { BACKEND_URL } from '../utils/constants';

const create = (from: string, to: string, roomId: number) => {
	let returnResponse;
	fetch(`${BACKEND_URL}/reservations`, {
		method: 'POST',
		body: JSON.stringify({ from, to, roomId }),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		returnResponse = response;
	});
	return returnResponse;
};

const get = (from: string, to: string, location: string) => {
	let returnResponse;
	console.log(from);
	console.log(to);
	console.log(location);
	fetch(`${BACKEND_URL}/reservations`, {
		method: 'POST',
		body: JSON.stringify({ from, to, location }),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		console.log(response);
	});
	return returnResponse;
};

const getById = (id: number) => {
	let returnResponse;
	fetch(`${BACKEND_URL}/reservations/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		returnResponse = response;
	});
	return returnResponse;
};

const remove = (id: number) => {
	let returnResponse;
	fetch(`${BACKEND_URL}/reservations/${id}`, {
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

const reservationService = {
	create,
	get,
	getById,
	remove
};

export default reservationService;
