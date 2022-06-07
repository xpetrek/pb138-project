import { ComponentStory, ComponentMeta } from '@storybook/react';

import ReservationCard from './ReservationCard';

export default {
	title: 'Room card',
	component: ReservationCard
} as ComponentMeta<typeof ReservationCard>;

const Template: ComponentStory<typeof ReservationCard> = args => (
	<ReservationCard />
);

export const GrandHotel = Template.bind({});
// GrandHotel.args = {
// 	id: 1,
// 	from: 'Brno',
// 	to: 'Grand hotel Brno',
// 	roomId: 1,
// 	description: 'Hotel je mozne vidiet z hlavnej zeleznicnej stanice Brno',
// 	pictures: [
// 		{
// 			url: 'https://images.static-hotel.cz/images/photos/hotel/4536/20130816084504_t9hnFG.jpg',
// 			label: 'Obrazok izby'
// 		}
// 	],
// 	price: 1670
// };
