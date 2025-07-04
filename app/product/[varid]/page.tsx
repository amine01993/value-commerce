
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import {metadata} from "@/app/layout";

interface ProductPageParams {
    params: Promise<{varid: string}>;
}

export default async function ProductPage({params}: ProductPageParams) {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
    
    const {varid} = await params;
    metadata.title = `Product ${varid}`;

    const Product = dynamic(() => import("./product"), {
        loading: () => <p>Loading...</p>,
    });

    const ProductDesktop = dynamic(() => import("./product-desktop"), {
        loading: () => <p>Loading...</p>,
    });

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
