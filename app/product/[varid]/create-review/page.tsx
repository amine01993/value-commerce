
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import {metadata} from "@/app/layout";

interface CreateReviewPageParams {
    params: Promise<{varid: string}>;
}

export default async function CreateReviewPage({params}: CreateReviewPageParams) {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";
    
    const {varid} = await params;
    metadata.title = `Create a review | Product ${varid}`;

    const CreateReview = dynamic(() => import("./create-review"), {
        loading: () => <p>Loading...</p>,
    });

    const CreateReviewDesktop = dynamic(() => import("./create-review-desktop"), {
        loading: () => <p>Loading...</p>,
    });
    
    return (
        <>
            {isMobile && (
                <CreateReview varid={varid} />
            )}
            {!isMobile && (
                <CreateReviewDesktop varid={varid} />
            )}
        </>
    );
}
