
import { Metadata } from "next";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import Product from "./product";

export const metadata: Metadata = {
	title: "Welcome to Value Commerce",
	description: "Welcome to Value Commerce, where you will have an incredible experience selling your products and also be able to buy fantastic products at great prices.",
};

interface ProductPageParams {
    params: Promise<{varid: string}>;
}

export default async function ProductPage({params}: ProductPageParams) {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";

    
    const {varid} = await params;
    metadata.title = `Product ${varid}`;

    return (
        <>
        {isMobile && (
            <Product varid={varid} />
        )}
        {/* {!isMobile && (
            // <HomeDesktop />
        )} */}
        </>
    );
}
