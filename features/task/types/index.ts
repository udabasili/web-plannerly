import { IProject } from '@/features/projects';
import { BaseEntity } from '@/types/index';

import { tasks } from '../data/tasks';

export type ITask = {
	name: typeof tasks & string;
	project: IProject;
	startDate: string;
	endDate: string;
	subTasksCompleted: Array<string>;
	subTasksPicked: Array<string>;
	subTasksDuration: Array<number>;
	progress: number;
} & BaseEntity;

export type ITaskRequest = {
	name: typeof tasks;
	project: Partial<IProject>;
	startDate: string;
	subTasksCompleted?: Array<string>;
	subTasksPicked: Array<string>;
	subTasksDuration: Array<number>;
	progress?: number;
};

export type ITaskResponse = {
	status: number;
	success: boolean;
	message: ITask;
};

export type ITasksResponse = {
	status: number;
	success: boolean;
	message: ITask[];
};
