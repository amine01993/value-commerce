import type { Metadata } from "next";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import StoreProvider from "./StoreProvider";
import {montserrat, open_sans} from "./fonts";
import "./globals.scss";
import { Provider } from "@/components/ui/provider";
import Header from "@/components/header";
import Menu from "@/components/menu";
import HeaderDesktop from "@/components/header-desktop";
import Footer from "@/components/footer";
import FooterDesktop from "@/components/footer/desktop";

export const metadata: Metadata = {
	title: "Welcome to Value Commerce",
	description: "Welcome to Value Commerce, where you will have an incredible experience selling your products and also be able to buy fantastic products at great prices.",
};

export default async function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	const { device } = userAgent({ headers: await headers() });
	const isMobile = device?.type === "mobile";

  	return (
		<html lang="en" suppressHydrationWarning>
			<body className={montserrat.variable + ' ' + open_sans.variable}>
				<StoreProvider>
					<Provider>
						{isMobile && (
							<>
							<Header />
							<Menu />
							</>
						)}
						{!isMobile && (
							<>
							<HeaderDesktop />
							</>
						)}
						{children}
						{isMobile && (
							<>
							<Footer />
							</>
						)}
						{!isMobile && (
							<>
							<FooterDesktop />
							</>
						)}
					</Provider>
				</StoreProvider>
			</body>
		</html>
  	);
}
