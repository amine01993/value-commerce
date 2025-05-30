
import dynamic from "next/dynamic";
import { userAgent } from "next/server";
import { headers } from "next/headers";

export default async function HomePage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";

    const Home = dynamic(() => import("./home"), {
        loading: () => <p>Loading...</p>,
    });

    const HomeDesktop = dynamic(() => import("./home-desktop"), {
        loading: () => <p>Loading...</p>,
    });

    return (
        <>
            {isMobile && (
                <Home />
            )}
            {!isMobile && (
                <HomeDesktop />
            )}
        </>
    );
}
