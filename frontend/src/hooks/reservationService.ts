import { BACKEND_URL } from '../utils/constants';

const getUrlParams = (
	roomId?: number,
	userId?: number,
	from?: string,
	to?: string
) => {
	let url = '';
	if (roomId !== undefined) url.concat(`roomId=${roomId}&`);
	if (userId !== undefined) url.concat(`userId=${userId}&`);
	if (from !== undefined && from.length > 0) url = url.concat(`from=${from}&`);
	if (to !== undefined && to.length > 0) url = url.concat(`to=${to}&`);
	return url;
};

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

const get = async (
	roomId?: number,
	userId?: number,
	from?: string,
	to?: string
) => {
	const urlPath = getUrlParams(roomId, userId, from, to);
	const response = await fetch(`${BACKEND_URL}/reservations?${urlPath}`, {
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

const getByUser = async (id: number) => {
	const response = await fetch(`${BACKEND_URL}/reservations?userId=${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
};

const remove = async (id: number, token: string) => {
	const response = await fetch(`${BACKEND_URL}/reservations/${id}`, {
		method: 'DELETE',
		body: JSON.stringify({ id }),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return response;
};

const reservationService = {
	create,
	get,
	getByUser,
	getById,
	remove
};

export default reservationService;
