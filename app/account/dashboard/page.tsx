
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import {metadata} from "@/app/layout"


export default async function DashboardPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Dashboard`;

    const Dashboard = dynamic(() => import("./dashboard"), {
        loading: () => <p>Loading...</p>,
    })

    const DashboardDesktop = dynamic(() => import("./dashboard-desktop"), {
        loading: () => <p>Loading...</p>,
    })

    return (
        <>
        {isMobile && (
            <Dashboard />
        )}
        {!isMobile && (
            <DashboardDesktop />
        )}
        </>
    );
}

