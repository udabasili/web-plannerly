import mongoose from 'mongoose';

import { departments, IEmployee, roles } from '@/features/employees';

import Tickets from './Tickets';

function validateEmail(email: string) {
	const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
}

type EmployeeSchema = {
	cloudinaryId: string;
} & IEmployee;

const employeeSchema = new mongoose.Schema<EmployeeSchema>(
	{
		name: {
			required: true,
			type: String,
			unique: true,
		},
		position: {
			required: true,
			enum: roles,
			type: String,
		},
		department: {
			required: true,
			enum: departments,
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
		joinedDate: {
			required: true,
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

employeeSchema.pre('remove', { document: true, query: false }, function (next) {
	Tickets.deleteMany({
		author: this._id,
	}).exec();
	next();
});

employeeSchema.pre('deleteOne', { document: true, query: false }, function (next) {
	Tickets.deleteMany({
		author: this._id,
	}).exec();
	next();
});

export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
