export type RoomData = {
	description: string;
	id: number;
	location: Location;
	name: string;
	ownerId: number;
	pictures: { url: string; label: string }[];
	pricePerDay: number;
};

export type Location = '' | 'Brno' | 'Praha';

export type Order =
	| 'location_asc'
	| 'location_desc'
	| 'price_asc'
	| 'price_desc';
