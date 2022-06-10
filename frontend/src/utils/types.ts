export type RoomData = {
	description: string;
	id: number;
	location: Location;
	name: string;
	ownerId: number;
	pictures: { url: string; label: string }[];
	pricePerDay: number;
};

export type ReservationData = {
	id: number;
	from: string;
	to: string;
	price: number;
	userId: number;
	roomId: number;
	room: {
		name: string;
		pictures: { url: string; label: string }[];
	};
};

export type UserData = {
	email: string;
	id: number;
	name: string;
};

export type SessionData = {
	user: UserData;
	token?: string;
};

export type AlertTypes = 'error' | 'warning' | 'info' | 'success';

export type Location = '' | 'Brno' | 'Praha';

export type Order =
	| 'location_asc'
	| 'location_desc'
	| 'price_asc'
	| 'price_desc';
