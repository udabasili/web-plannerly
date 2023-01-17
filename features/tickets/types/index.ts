import { IEmployee } from '@/features/employees';
import { BaseEntity } from '@/types/index';

export const status = ['inprogress', 'completed', 'cancelled'] as const;
export type ITicket = {
	ticketId: string;
	title: string;
	author: Partial<IEmployee>;
	status: typeof status[number];
} & BaseEntity;

export type ITicketRequest = {
	ticketId: string;
	title: string;
	author: string;
	status: typeof status[number];
};

export interface ITicketResponse {
	status: string;
	message: ITicket;
	success: boolean;
}

export interface ITicketsResponse {
	status: string;
	message: ITicket[];
	success: boolean;
}
