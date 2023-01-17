import { Error } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import Employees from '@/models/Employees';
import Ticket from '@/models/Tickets';
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
		const ticket = await Ticket.create(req.body);
		res.status(200).json({ message: ticket });
	} catch (error) {
		return errorController(error, req, res);
	}
});

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await dbConnect();
		const tickets = await Ticket.find({}).populate('author', '_id name profileUrl', Employees);
		return res.status(200).json({ success: true, message: tickets });
	} catch (error) {
		errorController(error, req, res);
	}
});

export default apiRoute;
