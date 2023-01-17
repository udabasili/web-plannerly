import { departments } from '../data/department';
import { roles } from '../data/roles';

export interface IEmployee {
	_id?: string;
	name: string;
	position: typeof roles[number];
	department: typeof departments[number];
	profileUrl: string;
	email: string;
	phoneNumber: string;
	joinedDate: string;
	created_at?: string;
	updated_at?: string;
}

export type IEmployeeRequest = {
	name: string;
	position: typeof roles[number];
	department: typeof departments[number];
	profileUrl: string;
	email: string;
	phoneNumber: string;
	joinedDate: string;
};

export interface IEmployeeResponse {
	status: string;
	message: IEmployee;
	success: boolean;
}

export interface IEmployeesResponse {
	status: string;
	message: IEmployee[];
	success: boolean;
}
