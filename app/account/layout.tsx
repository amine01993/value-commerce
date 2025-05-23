import { headers } from "next/headers";
import { userAgent } from "next/server";
import Account from "@/components/account";

export default async function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";

    return (
        <>
        {isMobile && (
            <Account>
                {children}
            </Account>
        )}
        </>
    );
}

