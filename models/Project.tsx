import { ObjectId } from 'mongodb';
import mongoose, { model } from 'mongoose';

import { IProject, priorities, projectCategories, projectStates } from '@/features/projects';

import Team from './Team';

export type IProjectRequest = {
	name: string;
	category: typeof projectCategories[number];
	startDate: Date;
	endDate: Date;
	priority: typeof priorities[number];
	budget: number;
	description: string;
	teamLeader: string;
};

const projectSchema = new mongoose.Schema<IProject>(
	{
		name: {
			required: true,
			type: String,
			unique: true,
		},
		category: {
			required: true,
			enum: projectCategories,
			type: String,
		},
		projectState: {
			required: true,
			enum: projectStates,
			type: String,
			default: 'approved',
		},
		startDate: {
			required: true,
			type: String,
		},
		endDate: {
			required: true,
			type: String,
		},
		priority: {
			required: true,
			enum: priorities,
			type: String,
		},
		budget: {
			type: Number,
			required: true,
		},
		description: {
			required: true,
			type: String,
		},
		teamLeader: {
			ref: 'Employee',
			type: ObjectId,
			required: true,
		},
		team: {
			ref: 'Team',
			type: ObjectId,
			unique: true,
		},
		client: {
			ref: 'Client',
			type: ObjectId,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

projectSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
	await Team.deleteOne({ project: this._id });
	next();
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
