import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddCard from './AddCard';

export default {
	title: 'Room card',
	component: AddCard
} as ComponentMeta<typeof AddCard>;

const Template: ComponentStory<typeof AddCard> = args => <AddCard />;

export const AddCardBlank = Template.bind({});
