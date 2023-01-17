import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { Employees, Project } from '@/models/index';
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
				const project = await Project.findById(id)
					.populate('teamLeader', '_id name profileUrl', Employees)
					.populate('team', '_id', Employees);
				if (!project) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, message: project });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		case 'PATCH':
			try {
				const query = { _id: new mongoose.Types.ObjectId(id as string) };
				const update = {
					$set: {
						...body,
					},
				};
				const project = await Project.findByIdAndUpdate(query, update, {
					new: true,
				});
				return res.status(200).json({ success: true, message: project });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		case 'DELETE':
			try {
				const project = await Project.findById(id);
				if (!project) {
					return res.status(400).json({ success: false });
				}
				await project.deleteOne();

				res.status(200).json({ success: true, message: 'Deleted' });
			} catch (error) {
				errorController(error, req, res);
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
