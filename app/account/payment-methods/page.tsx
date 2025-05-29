
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { metadata } from "@/app/layout";


export default async function PaymentMethodsPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Payment Methods`;

    const PaymentMethods = dynamic(() => import("./payment-methods"), {
        loading: () => <p>Loading...</p>,
    });

    const PaymentMethodsDesktop = dynamic(() => import("./payment-methods-desktop"), {
        loading: () => <p>Loading...</p>,
    });

    return (
        <>
            {isMobile && (
                <PaymentMethods />
            )}
            {!isMobile && (
                <PaymentMethodsDesktop />
            )}
        </>
    );
}

