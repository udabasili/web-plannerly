import { AxiosError } from 'axios';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import Employee from '@/models/Employees';
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
				const employee = await Employee.findById(id);
				if (!employee) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, message: employee });
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
				const employee = await Employee.findByIdAndUpdate(query, update, {
					new: true,
				});
				return res.status(200).json({ success: true, message: employee });
			} catch (error) {
				return errorController(error, req, res);
			}
			break;
		case 'DELETE':
			try {
				const employee = await Employee.findById(id);
				if (!employee) {
					return res.status(400).json({ success: false });
				}
				cloudinary.v2.uploader.destroy(employee.cloudinaryId);
				await employee.remove();

				res.status(200).json({ success: true, message: employee });
			} catch (error) {
				errorController(error, req, res);
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
