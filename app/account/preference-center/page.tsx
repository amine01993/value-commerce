
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { metadata } from "@/app/layout";

export default async function PreferenceCenterPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Preference Center`;

    const PreferenceCenter = dynamic(() => import("./preference-center"), {
        loading: () => <p>Loading...</p>,
    });

    const PreferenceCenterDesktop = dynamic(() => import("./preference-center-desktop"), {
        loading: () => <p>Loading...</p>,
    });

    return (
        <>
            {isMobile && (
                <PreferenceCenter />
            )}
            {!isMobile && (
                <PreferenceCenterDesktop />
            )}
        </>
    );
}

