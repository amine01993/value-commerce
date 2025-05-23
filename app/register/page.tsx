
import { headers } from "next/headers";
import { userAgent } from "next/server";
import Register from "./register";
import RegisterDesktop from "./register-desktop";
import {metadata} from "@/app/layout"

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
