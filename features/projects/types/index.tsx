import { CreateProjectDTO } from '../api/createProject';

import { BaseEntity } from '@/types/index';

export const projectStates = ['all', 'started', 'approved', 'completed'] as const;

export type ProjectListProps = {
	projectState: typeof projectStates[number];
};

export type ProjectItemProps = CreateProjectDTO & BaseEntity;
