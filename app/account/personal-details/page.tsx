
import { headers } from "next/headers";
import { userAgent } from "next/server";
import PersonalDetail from "./personal-detail";
import PersonalDetailDesktop from "./personal-detail-desktop";
import {metadata} from "@/app/layout"


export default async function PersonalDetailPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Personal Detail`;

    return (
        <>
        {isMobile && (
            <PersonalDetail />
        )}
        {!isMobile && (
            <PersonalDetailDesktop />
        )}
        </>
    );
}

