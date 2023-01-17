import mongoose from 'mongoose';

import { IClient } from '@/features/clients';

function validateEmail(email: string) {
	const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
}

type ClientSchema = {
	cloudinaryId: string;
} & IClient;

const clientSchema = new mongoose.Schema<ClientSchema>(
	{
		name: {
			required: true,
			type: String,
			unique: true,
		},
		companyName: {
			required: true,
			type: String,
		},
		profileUrl: {
			required: true,
			type: String,
		},
		cloudinaryId: {
			required: true,
			type: String,
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'Email address is required'],
			validate: [validateEmail, 'Please fill a valid email address'],
			match: [/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
		},
		phoneNumber: {
			required: true,
			type: String,
			validate: {
				validator: function (v: string) {
					return /\d{3}-\d{3}-\d{4}/.test(v);
				},
				message: (props: any) => `${props.value} is not a valid phone number!`,
			},
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Client || mongoose.model('Client', clientSchema);
