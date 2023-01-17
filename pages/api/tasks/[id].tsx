import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { ITask } from '@/features/task';
import Employees from '@/models/Employees';
import Project from '@/models/Project';
import Task from '@/models/Tasks';
import Team from '@/models/Team';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await dbConnect();
	const {
		method,
		body,
		query: { id },
	} = req;

	switch (method) {
		case 'GET':
			try {
				const projectId = id as string;
				const tasks = await Task.find({
					project: new ObjectId(projectId),
				}).populate('project', '_id name');

				if (!tasks) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, message: tasks });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		case 'PATCH':
			try {
				const tasks = req.body as ITask[];
				await Promise.all(
					tasks.map(async (task) => {
						const query = { _id: new mongoose.Types.ObjectId(task._id) };
						const update = {
							$set: {
								...task,
							},
						};
						await Task.updateMany(query, update, {
							multi: true,
						});
					})
				);

				return res.status(200).json({ success: true, message: 'task' });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		case 'DELETE':
			try {
				const task = await Task.findById(id);
				if (!task) {
					return res.status(400).json({ success: false });
				}
				await task.remove();

				res.status(200).json({ success: true, message: task });
			} catch (error) {
				errorController(error, req, res);
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
