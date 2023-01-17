/* eslint-disable no-restricted-imports */

import { ITeam, ITeamRequest } from '../types';

const date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);

export const teamData: ITeamRequest = {
	teamLeader: 'Una Coleman',
	project: 'Fast Card',
	currentTask: 'Content creation',
	projectStart: date.toDateString(),
	teamMembers: [
		'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
		'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
		'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
		'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
		'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
	],
	status: 'in progress',
};
