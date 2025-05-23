

import { headers } from "next/headers";
import { userAgent } from "next/server";
import Photo from "./photo";
import PhotoDesktop from "./photo-desktop";
import {metadata} from "@/app/layout"


export default async function PhotoPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Photo`;

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

