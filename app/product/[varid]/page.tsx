
import { headers } from "next/headers";
import { userAgent } from "next/server";
import Product from "./product";
import ProductDesktop from "./product-desktop";
import {metadata} from "@/app/layout";

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
        {!isMobile && (
            <ProductDesktop varid={varid} />
        )}
        </>
    );
}
