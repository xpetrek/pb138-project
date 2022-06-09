import { BACKEND_URL } from '../utils/constants';
import { SessionData } from '../utils/types';

const getUrlParams = (
	from?: string,
	to?: string,
	location?: string,
	ownerId?: number
) => {
	let url = '';
	if (ownerId !== undefined) url = url.concat(`ownerId=${ownerId}&`);
	if (from !== undefined && from.length > 0) url = url.concat(`from=${from}&`);
	if (to !== undefined && to.length > 0) url = url.concat(`to=${to}&`);
	if (location !== undefined && location.length > 0)
		url = url.concat(`location=${location}`);
	return url;
};

const create = async (
	name: string,
	description: string,
	location: string,
	pricePerDay: number,
	imageUrl: string,
	imageLabel: string,
	session: SessionData
) => {
	if (!session?.token) return;

	const response = await fetch(`${BACKEND_URL}/rooms`, {
		method: 'POST',
		body: JSON.stringify({
			name,
			description,
			location,
			pricePerDay,
			pictures: [{ url: imageUrl, label: imageLabel }],
			ownerId: session?.user.id
		}),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${session.token}`
		}
	});
	return response;
};

const get = async (
	from?: string,
	to?: string,
	location?: string,
	ownerId?: number
) => {
	const urlPath = getUrlParams(from, to, location, ownerId);
	const response = await fetch(`${BACKEND_URL}/rooms?${urlPath}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
};

const getByLocation = async (location?: string) => {
	const urlPath = location !== undefined ? `location=${location}` : '';
	const response = await fetch(`${BACKEND_URL}/rooms?${urlPath}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
};

const getById = async (id: number) => {
	const response = await fetch(`${BACKEND_URL}/rooms/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
};

const getByUser = async (id: number) => {
	const response = await fetch(`${BACKEND_URL}/rooms?ownerId=${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return response;
};

const remove = async (id: number, token: string) => {
	const response = await fetch(`${BACKEND_URL}/rooms/${id}`, {
		method: 'DELETE',
		body: JSON.stringify({ id }),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	return response;
};

const roomService = {
	create,
	get,
	getByLocation,
	getByUser,
	getById,
	remove
};

export default roomService;
