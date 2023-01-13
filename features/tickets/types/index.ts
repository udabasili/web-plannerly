import { BaseEntity } from '@/types/index';

const status = ['inprogress', 'completed', 'cancelled'] as const;
export type Ticket = {
	title: string;
	author: string;
	status: typeof status[number];
} & BaseEntity;
