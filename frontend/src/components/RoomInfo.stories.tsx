import { ComponentStory, ComponentMeta } from '@storybook/react';

import RoomInfo from './RoomInfo';

export default {
	title: 'RoomInfo',
	component: RoomInfo
} as ComponentMeta<typeof RoomInfo>;

const Template: ComponentStory<typeof RoomInfo> = args => (
	<RoomInfo {...args} />
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
