export interface IClient {
	_id?: string;
	name: string;
	companyName: string;
	profileUrl: string;
	email: string;
	phoneNumber: string;
	created_at?: string;
	updated_at?: string;
}

export type IClientRequest = {
	name: string;
	companyName: string;
	profileUrl: string;
	email: string;
	phoneNumber: string;
};
export type IClientResponse = {
	status: number;
	success: boolean;
	message: IClient;
};

export type IClientsResponse = {
	status: number;
	success: boolean;
	message: IClient[];
};
