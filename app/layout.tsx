import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import {montserrat, open_sans} from "./fonts";
import "./globals.scss";
import { Provider } from "@/components/ui/provider";
import Header from "@/components/header";
import Menu from "@/components/menu";

export const metadata: Metadata = {
	title: "Welcome to Value Commerce",
	description: "Welcome to Value Commerce, where you will have an incredible experience selling your products and also be able to buy fantastic products at great prices.",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
  	return (
		<StoreProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={montserrat.variable + ' ' + open_sans.variable}>
				<Provider>
					<Header />
					<Menu />
					{children}
				</Provider>
				</body>
			</html>
		</StoreProvider>
  	);
}
