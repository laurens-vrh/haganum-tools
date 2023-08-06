/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [{ source: "/", destination: "/woordjes", permanent: false }];
	},
};

module.exports = nextConfig;
