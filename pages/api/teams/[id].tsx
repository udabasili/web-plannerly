import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

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
				const team = await Team.findById(id)
					.populate('project', '_id name')
					.populate('teamLeader', '_id name profileUrl')
					.populate('teamMembers', '_id name profileUrl');

				if (!team) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, message: team });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		case 'PATCH':
			try {
				const query = { _id: new mongoose.Types.ObjectId(id as string) };
				console.log(body);
				const update = {
					$set: {
						teamMembers: [...body],
					},
				};
				const team = await Team.findByIdAndUpdate(query, update, {
					new: true,
				});
				return res.status(200).json({ success: true, message: team });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		case 'DELETE':
			try {
				const team = await Team.findById(id);
				if (!team) {
					return res.status(400).json({ success: false });
				}
				await team.remove();

				res.status(200).json({ success: true, message: team });
			} catch (error) {
				errorController(error, req, res);
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
