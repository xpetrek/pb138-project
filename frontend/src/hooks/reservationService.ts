import { BACKEND_URL } from '../utils/constants';

const create = async (
	from: string,
	to: string,
	roomId: number,
	userId: number,
	token: string
) => {
	const response = await fetch(`${BACKEND_URL}/reservations`, {
		method: 'POST',
		body: JSON.stringify({ from, to, roomId, userId }),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return response;
};

const get = async (from?: string, to?: string, location?: string) => {
	const response = await fetch(`${BACKEND_URL}/reservations`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
};

const getById = async (id: number) => {
	const response = await fetch(`${BACKEND_URL}/reservations/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
};

const getByOwner = async (id: number) => {
	const response = await fetch(`${BACKEND_URL}/reservations?ownerId${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then();
	return response;
};

const remove = async (id: number) => {
	const response = await fetch(`${BACKEND_URL}/reservations/${id}`, {
		method: 'DELETE',
		body: JSON.stringify({ id }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
};

const reservationService = {
	create,
	get,
	getByOwner,
	getById,
	remove
};

export default reservationService;
