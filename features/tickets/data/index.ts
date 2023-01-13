import { Ticket } from '../types';

const date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);

export const ticketData: Ticket = {
	id: '#Tc-00011',
	title: 'Internet Not Working',
	author: 'John Weston',
	status: 'inprogress',
	createdAt: date.toDateString(),
};
