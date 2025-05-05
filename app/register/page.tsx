
import { Metadata } from "next";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import Register from "./register";
import RegisterDesktop from "./register-desktop";

export const metadata: Metadata = {
	title: "Welcome to Value Commerce",
	description: "Welcome to Value Commerce, where you will have an incredible experience selling your products and also be able to buy fantastic products at great prices.",
};

interface RegisterPageParams {
    searchParams: Promise<{q: string}>;
}

export default async function RegisterPage(
    {searchParams}: RegisterPageParams,
) {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";

    const {q = ""} = await searchParams;
  
    metadata.title = `Sign up | Value Commerce`;

    return (
        <>
        {isMobile && (
            <Register />
        )}
        {!isMobile && (
            <RegisterDesktop />
        )}
        </>
    );
}
