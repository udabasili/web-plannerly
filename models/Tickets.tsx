import mongoose, { Types } from 'mongoose';

import { ITicket, status } from '@/features/tickets';

const ticketSchema = new mongoose.Schema<ITicket>(
	{
		ticketId: {
			required: true,
			type: String,
			unique: true,
		},
		title: {
			required: true,
			type: String,
			unique: true,
		},
		status: {
			required: true,
			type: String,
			enum: status,
		},
		author: {
			ref: 'Employee',
			type: Types.ObjectId,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
