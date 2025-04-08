import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import {montserrat, open_sans} from "./fonts";
import "./globals.scss";

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
			<html lang="en">
				<body className={montserrat.variable + ' ' + open_sans.variable}>
					{children}
				</body>
			</html>
		</StoreProvider>
  	);
}
