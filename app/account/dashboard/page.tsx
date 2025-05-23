

import { headers } from "next/headers";
import { userAgent } from "next/server";
import Dashboard from "./dashboard";
import DashboardDesktop from "./dashboard-desktop";
import {metadata} from "@/app/layout"


export default async function DashboardPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Dashboard`;

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

