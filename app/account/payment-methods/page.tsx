
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { metadata } from "@/app/layout"
import PaymentMethods from "./payment-methods";
import PaymentMethodsDesktop from "./payment-methods-desktop";


export default async function PaymentMethodsPage() {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
  
    metadata.title = `Account Payment Methods`;

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

