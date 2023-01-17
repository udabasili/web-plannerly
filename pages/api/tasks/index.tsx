import { Error } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { ITaskRequest } from '@/features/task';
import Employees from '@/models/Employees';
import Project from '@/models/Project';
import Task from '@/models/Tasks';
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
		const tasksArray: ITaskRequest[] = req.body;
		const task = await Task.insertMany(tasksArray);
		res.status(200).json({ message: task });
	} catch (error: any) {
		console.log(error.response);
		return errorController(error, req, res);
	}
});

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await dbConnect();
		const tasks = await Task.find({}).populate('project', '_id name');
		return res.status(200).json({ success: true, message: tasks });
	} catch (error) {
		errorController(error, req, res);
	}
});

export default apiRoute;
