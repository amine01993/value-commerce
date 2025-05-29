
import { headers } from "next/headers";
import { userAgent } from "next/server";
import ForgotPassword from "./forgot-password";
import ForgotPasswordDesktop from "./forgot-password-desktop";
import {metadata} from "@/app/layout";


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
