import { Error } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

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
		const team = await Team.create(req.body);
		res.status(200).json({ message: team });
	} catch (error) {
		return errorController(error, req, res);
	}
});

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await dbConnect();
		const teams = await Team.find({})
			.populate('project', '_id name', Project)
			.populate('teamLeader', '_id name profileUrl')
			.populate('teamMembers', '_id name profileUrl');
		return res.status(200).json({ success: true, message: teams });
	} catch (error) {
		errorController(error, req, res);
	}
});
export default apiRoute;
