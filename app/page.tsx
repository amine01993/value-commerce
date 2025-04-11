
import Home from "./home";
import HomeDesktop from "./home-desktop";

export default function HomePage() {

	const isMobile = true;

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
