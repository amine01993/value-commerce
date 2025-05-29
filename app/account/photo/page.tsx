
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import {metadata} from "@/app/layout";


export default async function PhotoPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Photo`;

    const Photo = dynamic(() => import("./photo"), {
        loading: () => <p>Loading...</p>,
    });

    const PhotoDesktop = dynamic(() => import("./photo-desktop"), {
        loading: () => <p>Loading...</p>,
    });

    return (
        <>
            {isMobile && (
                <Photo />
            )}
            {!isMobile && (
                <PhotoDesktop />
            )}
        </>
    );
}

