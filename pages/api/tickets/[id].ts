import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import Employees from '@/models/Employees';
import Ticket from '@/models/Tickets';
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
				const ticket = await Ticket.findById(id).populate('author', '_id name profileUrl', Employees);
				if (!ticket) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, message: ticket });
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
				const ticket = await Ticket.findByIdAndUpdate(query, update, {
					new: true,
				});
				return res.status(200).json({ success: true, message: ticket });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		case 'DELETE':
			try {
				const ticket = await Ticket.findById(id);
				if (!ticket) {
					return res.status(400).json({ success: false });
				}
				await ticket.remove();

				res.status(200).json({ success: true, message: ticket });
			} catch (error) {
				errorController(error, req, res);
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
