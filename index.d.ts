/* eslint-disable no-var */

export declare global {
	var mongoose: {
		promise: Promise<typeof import('mongoose')> | null;
		conn: import('mongoose');
	};
}

declare module 'next' {
	interface NextApiRequest {
		files: any;
	}
}
