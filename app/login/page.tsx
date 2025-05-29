
import { headers } from "next/headers";
import { userAgent } from "next/server";
import Login from "./login";
import LoginDesktop from "./login-desktop";
import {metadata} from "@/app/layout";

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
