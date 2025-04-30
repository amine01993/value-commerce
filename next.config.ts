import type { NextConfig } from "next";
import MillionLint from '@million/lint';

const nextConfig: NextConfig = {
  /* config options here */
	reactStrictMode: true,
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
	},
};

export default MillionLint.next({ rsc: true })(nextConfig);
// export default nextConfig;