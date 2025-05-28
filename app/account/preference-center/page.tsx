
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { metadata } from "@/app/layout"
import PreferenceCenter from "./preference-center";
import PreferenceCenterDesktop from "./preference-center-desktop";

export default async function PreferenceCenterPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Preference Center`;

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

