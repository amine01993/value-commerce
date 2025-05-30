
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import {metadata} from "@/app/layout";


export default async function ForgotPasswordPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Forgot Password? | Value Commerce`;

    const ForgotPassword = dynamic(() => import("./forgot-password"), {
        loading: () => <p>Loading...</p>,
    });

    const ForgotPasswordDesktop = dynamic(() => import("./forgot-password-desktop"), {
        loading: () => <p>Loading...</p>,
    });

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
