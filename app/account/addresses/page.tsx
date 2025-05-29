
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { metadata } from "@/app/layout";


export default async function AddressesPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Addresses`;

    const Addresses = dynamic(() => import("./addresses"), {
        loading: () => <p>Loading...</p>,
    });

    const AddressesDesktop = dynamic(() => import("./addresses-desktop"), {
        loading: () => <p>Loading...</p>,
    });

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

