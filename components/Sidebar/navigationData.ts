import { AiFillHome, AiFillProject } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { HiTicket, HiUsers } from 'react-icons/hi';

export const navData = [
	// {
	// 	name: 'dashboard',
	// 	icon: AiFillHome,
	// 	children: ['Hr Dashboard', 'Project Dashboard'],
	// 	collapsible: true,
	// },
	{
		name: '',
		icon: AiFillHome,
		collapsible: false,
	},
	{
		name: 'projects',
		icon: AiFillProject,
		children: ['Projects', 'Tasks'],
		collapsible: true,
	},
	{
		name: 'tickets',
		icon: HiTicket,
		// children: ['Tickets View', 'Tickets Details'],
		collapsible: false,
	},
	{
		name: 'clients',
		icon: FiUsers,
		// children: ['Clients', 'Client Profile'],
		collapsible: false,
	},
	{
		name: 'employees',
		icon: HiUsers,
		// children: ['Employees', 'Employee Profile', 'Department'],
		children: ['Employees', 'Department'],
		collapsible: false,
	},
];
