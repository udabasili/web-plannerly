/* eslint-disable no-restricted-imports */
import { Team } from '../types';

import { tasks } from '@/features/task/data/tasks';

const date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);

export const teamData: Team = {
	id: 'team',
	teamLeader: 'Una Coleman',
	project: 'Fast Card',
	currentTask: 'Goal identification',
	projectStart: date.toDateString(),
	teamMembers: [
		'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
		'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
		'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
		'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
		'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
	],
	status: 'inprogress',
	createdAt: date.toDateString(),
};
