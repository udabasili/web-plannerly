import { MongoServerError } from 'mongodb';
import { Error } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

//handle email or usename duplicates
const handleDuplicateKeyError = (err: MongoServerError, res: NextApiResponse) => {
	const field = Object.keys(err.keyValue);
	const code = 409;
	const error = `An account with that ${field} already exists.`;
	return res.status(code).json({ message: error, fields: field, success: false });
};

//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err: typeof Error.ValidationError, res: NextApiResponse) => {
	if (err instanceof Error.ValidationError) {
		const errors = Object.values(err.errors).map((el) => el.message);
		const fields = Object.values(err.errors).map((el) => el.path);
		const code = 400;
		if (errors.length > 1) {
			const formattedErrors = errors.join('');
			res.status(code).json({ messages: formattedErrors, fields: fields, success: false });
		} else {
			res.status(code).json({ messages: errors, fields: fields, success: false });
		}
	}
};

const errorController = (err: any, req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (err.name === 'ValidationError') return (err = handleValidationError(err, res));
		if (err.code && err.code == 11000) return (err = handleDuplicateKeyError(err, res));
		return res.status(400).json({
			success: false,
			message: (err as Error).message,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: (err as Error).message,
		});
	}
};

export default errorController;
