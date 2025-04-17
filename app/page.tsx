"use client";

import { useAppSelector } from "@/lib/hooks";
import Home from "./home";
import HomeDesktop from "./home-desktop";

export default function HomePage() {

	const isMobile = useAppSelector(state => state.mainSlice.isMobile);

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
