
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";

export default async function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";

    const Account = dynamic(() => import("@/components/account"), {
        loading: () => <p>Loading...</p>,
    })

    const AccountDesktop = dynamic(() => import("@/components/account/desktop"), {
        loading: () => <p>Loading...</p>,
    })

    return (
        <>
        {isMobile && (
            <Account>
                {children}
            </Account>
        )}
        {!isMobile && (
            <AccountDesktop>
                {children}
            </AccountDesktop>
        )}
        </>
    );
}

