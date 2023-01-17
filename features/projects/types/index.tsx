import { IClient } from '@/features/clients';
import { IEmployee } from '@/features/employees';
import { ITeam } from '@/features/teams';
import { BaseEntity } from '@/types/index';

import { projectCategories } from '../data/projectCategories';

export const priorities = ['low', 'medium', 'high'] as const;
export const projectStates = ['all', 'started', 'approved', 'completed'] as const;

export type IProject = {
	name: string;
	category: typeof projectCategories[number];
	startDate: string;
	endDate: string;
	priority: typeof priorities[number];
	budget: number;
	description: string;
	client: Partial<IClient>;
	team: Partial<ITeam>;
	teamLeader: Partial<IEmployee>;
	projectState: typeof projectStates[number];
} & BaseEntity;

export type IProjectRequest = {
	name: string;
	category: typeof projectCategories[number];
	startDate: string;
	endDate: string;
	priority: typeof priorities[number];
	budget: number;
	description: string;
	teamLeader: string;
	client: string;
};

export type IProjectResponse = {
	status: number;
	success: boolean;
	message: IProject;
};

export type IProjectsResponse = {
	status: number;
	success: boolean;
	message: IProject[];
};
