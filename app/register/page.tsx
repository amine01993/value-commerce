
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import {metadata} from "@/app/layout";

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

    const Register = dynamic(() => import("./register"), {
        loading: () => <p>Loading...</p>,
    });

    const RegisterDesktop = dynamic(() => import("./register-desktop"), {
        loading: () => <p>Loading...</p>,
    });

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
