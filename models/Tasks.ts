import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

import { tasks, ITask } from '@/features/task';

const taskSchema = new mongoose.Schema<ITask>(
	{
		project: {
			type: ObjectId,
			ref: 'Project',
		},
		name: {
			type: String,
			required: true,
			unique: true,
			enum: tasks,
		},
		startDate: {
			type: String,
		},
		endDate: {
			type: String,
		},
		subTasksCompleted: [{ type: String }],
		subTasksPicked: [{ type: String }],
		subTasksDuration: [{ type: String }],
		progress: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Task || mongoose.model('Task', taskSchema);
