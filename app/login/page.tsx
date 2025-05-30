
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
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

    const Login = dynamic(() => import("./login"), {
        loading: () => <p>Loading...</p>,
    });

    const LoginDesktop = dynamic(() => import("./login-desktop"), {
        loading: () => <p>Loading...</p>,
    });

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
