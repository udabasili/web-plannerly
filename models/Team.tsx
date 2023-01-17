import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

import { tasks } from '@/features/task';
import { ITeam, status } from '@/features/teams';

const teamSchema = new mongoose.Schema<ITeam>(
	{
		project: {
			type: ObjectId,
			ref: 'Project',
		},
		projectStart: {
			type: String,
		},
		currentTask: {
			type: String,
			enum: tasks,
		},
		status: {
			type: String,
			enum: status,
			default: 'allocated',
		},
		teamLeader: {
			ref: 'Employee',
			type: ObjectId,
			required: true,
		},
		teamMembers: [
			{
				ref: 'Employee',
				type: ObjectId,
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Team || mongoose.model('Team', teamSchema);
