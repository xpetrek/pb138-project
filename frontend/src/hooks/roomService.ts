import { BACKEND_URL } from '../utils/constants';

const create = (
	name: string,
	description: string,
	location: string,
	pricePerDay: number
) => {
	let returnResponse;
	fetch(`${BACKEND_URL}/rooms`, {
		method: 'POST',
		body: JSON.stringify({ name, description, location, pricePerDay }),
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
	fetch(`${BACKEND_URL}/rooms`, {
		method: 'POST',
		body: JSON.stringify({ from, to, location }),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => {
		returnResponse = response;
	});
	return returnResponse;
};

const getById = (id: number) => {
	let returnResponse;
	fetch(`${BACKEND_URL}/rooms/${id}`, {
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
