import { IEmployee } from '@/features/employees';
import { IProject } from '@/features/projects';
import { tasks } from '@/features/task';
import { BaseEntity } from '@/types/index';

export const status = ['allocated', 'in progress', 'completed', 'cancelled'] as const;

export type ITeam = {
	teamLeader: Partial<IEmployee>;
	project: Partial<IProject>;
	currentTask: typeof tasks[number];
	projectStart: string;
	teamMembers: Array<Partial<IEmployee>>;
	status: typeof status[number];
} & BaseEntity;

export type ITeamRequest = {
	teamLeader: string;
	project: string;
	currentTask: typeof tasks[number];
	projectStart: string;
	teamMembers: Array<string>;
	status: typeof status[number];
};

export type ITeamResponse = {
	status: number;
	success: boolean;
	message: ITeam;
};

export type ITeamsResponse = {
	status: number;
	success: boolean;
	message: ITeam[];
};
