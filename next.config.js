/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ['mdbcdn.b-cdn.net', 'flowbite.com', 'res.cloudinary.com'],
	},
};

module.exports = nextConfig;
