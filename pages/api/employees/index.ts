import cloudinary, { UploadApiResponse } from 'cloudinary';
import { MongoError, MongoServerError } from 'mongodb';
import { Error } from 'mongoose';
import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from '@/config/index';
import Employee from '@/models/Employees';
import dbConnect from '@/utils/dbConnect';
import errorController from '@/utils/errorController';

cloudinary.v2.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	secure: true,
});

interface NextApiRequestWithMulter extends NextApiRequest {
	files: {
		file: Express.Multer.File[];
	};
}

const upload = multer({
	storage: multer.diskStorage({}),
});

const cpUpload = upload.fields([
	{
		name: 'file',
		maxCount: 1,
	},
	{
		name: 'data',
		maxCount: 6,
	},
]);

const apiRoute = nextConnect({
	onError(error: Error, req: NextApiRequestWithMulter, res: NextApiResponse) {
		res.status(501).json({ success: false, message: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req: NextApiRequestWithMulter, res: NextApiResponse) {
		res.status(405).json({ success: false, message: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.use(cpUpload);

apiRoute.post(async (req: NextApiRequestWithMulter, res: NextApiResponse) => {
	let result = {} as UploadApiResponse;
	try {
		await dbConnect();
		const image = req.files.file[0];
		const employeeData = JSON.parse(req.body.data);
		result = await cloudinary.v2.uploader.upload(image.path);
		const employee = await Employee.create({
			...employeeData,
			profileUrl: result.secure_url,
			cloudinaryId: result.public_id,
		});
		res.status(200).json({ message: employee });
	} catch (error) {
		if (result.public_id) {
			cloudinary.v2.uploader.destroy(result.public_id);
		}
		return errorController(error, req, res);
	}
});

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await dbConnect();
		const employees = await Employee.find({});
		return res.status(200).json({ success: true, message: employees });
	} catch (error) {
		errorController(error, req, res);
	}
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};
