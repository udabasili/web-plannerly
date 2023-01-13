import { projectCategories } from '../data/projectCategories';

export const priorities = ['low', 'medium', 'high'];
export type CreateProjectDTO = {
	name: string;
	category: typeof projectCategories[number];
	image: string;
	startDate: Date;
	endDate: Date;
	priority: typeof priorities[number];
	budget: number;
	description?: string;
	teamLeader?: string;
};
