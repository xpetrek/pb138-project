import { ComponentStory, ComponentMeta } from '@storybook/react';

import RoomCard from './RoomCard';

export default {
	title: 'Room card',
	component: RoomCard
} as ComponentMeta<typeof RoomCard>;

const Template: ComponentStory<typeof RoomCard> = args => (
	<RoomCard {...args} />
);

export const GrandHotel = Template.bind({});
GrandHotel.args = {
	id: 1,
	location: 'Brno',
	name: 'Grand hotel Brno',
	ownerId: 1,
	description: 'Hotel je mozne vidiet z hlavnej zeleznicnej stanice Brno',
	pictures: [
		{
			url: 'https://images.static-hotel.cz/images/photos/hotel/4536/20130816084504_t9hnFG.jpg',
			label: 'Obrazok izby'
		}
	],
	pricePerDay: 1670
};
