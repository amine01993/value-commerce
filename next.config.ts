import type { NextConfig } from "next";
import MillionLint from '@million/lint';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default MillionLint.next({ rsc: true })(nextConfig);