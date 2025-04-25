
import Home from "./home";
import HomeDesktop from "./home-desktop";
import { userAgent } from "next/server";
import { headers } from "next/headers";

export default async function HomePage() {

	const { device } = userAgent({ headers: await headers() });
	const isMobile = device?.type === "mobile";

	return (
		<>
		{isMobile && (
			<Home />
		)}
		{!isMobile && (
			<HomeDesktop />
		)}
		</>
	);
}
