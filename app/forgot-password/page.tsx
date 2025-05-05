
import { Metadata } from "next";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import ForgotPassword from "./forgot-password";
import ForgotPasswordDesktop from "./forgot-password-desktop";

export const metadata: Metadata = {
	title: "Welcome to Value Commerce",
	description: "Welcome to Value Commerce, where you will have an incredible experience selling your products and also be able to buy fantastic products at great prices.",
};

export default async function ForgotPasswordPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Forgot Password? | Value Commerce`;

    return (
        <>
        {isMobile && (
            <ForgotPassword />
        )}
        {!isMobile && (
            <ForgotPasswordDesktop />
        )}
        </>
    );
}
