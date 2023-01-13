import { tasks } from '@/features/task';
import { BaseEntity } from '@/types/index';

const status = ['inprogress', 'completed', 'cancelled'] as const;
export type Team = {
	teamLeader: string;
	project: string;
	currentTask: typeof tasks[number];
	projectStart: string;
	teamMembers: Array<string>;
	status: typeof status[number];
} & BaseEntity;
