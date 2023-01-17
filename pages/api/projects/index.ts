import { ObjectId } from 'mongodb';
import { Error } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { IProjectRequest } from '@/features/projects';
import Employees from '@/models/Employees';
import Project from '@/models/Project';
import Team from '@/models/Team';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';

const apiRoute = nextConnect({
	onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
		res.status(501).json({ success: false, message: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req: NextApiRequest, res: NextApiResponse) {
		res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await dbConnect();
		const projectBody = req.body as IProjectRequest;
		const teamLeader = new ObjectId(projectBody.teamLeader);
		const team = await Team.create({
			teamLeader,
		});
		const project = await Project.create({
			...projectBody,
			team: team._id,
		});
		await Team.updateOne(
			{ _id: team._id },
			{
				teamMembers: [teamLeader],
				project: project._id,
				projectStart: projectBody.startDate,
			}
		);

		res.status(200).json({ message: 'project' });
	} catch (error) {
		return errorController(error, req, res);
	}
});

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await dbConnect();
		const projects = await Project.find({})
			//need to add the model here since Next.js uses multiple connections
			.populate('teamLeader', '_id name profileUrl', Employees)
			.populate('team', '_id');

		return res.status(200).json({ success: true, message: projects });
	} catch (error) {
		errorController(error, req, res);
	}
});

export default apiRoute;
