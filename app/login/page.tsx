
import { Metadata } from "next";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import Login from "./login";
import LoginDesktop from "./login-desktop";

export const metadata: Metadata = {
	title: "Welcome to Value Commerce",
	description: "Welcome to Value Commerce, where you will have an incredible experience selling your products and also be able to buy fantastic products at great prices.",
};

interface LoginPageParams {
    searchParams: Promise<{q: string}>;
}

export default async function LoginPage(
    {searchParams}: LoginPageParams,
) {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";

    const {q = ""} = await searchParams;
  
    metadata.title = `Log in | Value Commerce`;

    return (
        <>
        {isMobile && (
            <Login />
        )}
        {!isMobile && (
            <LoginDesktop />
        )}
        </>
    );
}
