
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { metadata } from "@/app/layout"
import Addresses from "./addresses";
import AddressesDesktop from "./addresses-desktop";


export default async function AddressesPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Addresses`;

    return (
        <>
        {isMobile && (
            <Addresses />
        )}
        {!isMobile && (
            <AddressesDesktop />
        )}
        </>
    );
}

