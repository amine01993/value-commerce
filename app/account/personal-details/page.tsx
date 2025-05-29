
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import {metadata} from "@/app/layout";


export default async function PersonalDetailPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Personal Detail`;

    const PersonalDetail = dynamic(() => import("./personal-detail"), {
        loading: () => <p>Loading...</p>,
    });

    const PersonalDetailDesktop = dynamic(() => import("./personal-detail-desktop"), {
        loading: () => <p>Loading...</p>,
    });

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

