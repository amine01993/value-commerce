
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import {metadata} from "@/app/layout";

interface SearchPageParams {
    searchParams: Promise<{q: string}>;
}

export default async function SearchPage(
    {searchParams}: SearchPageParams,
) {

    const { device } = userAgent({ headers: await headers() });
    const isMobile = device?.type === "mobile";

    const {q = ""} = await searchParams;
  
    metadata.title = `Search Results For: ${q} | Value Commerce`;

    const Search = dynamic(() => import("./search"), {
        loading: () => <p>Loading...</p>,
    });

    const SearchDesktop = dynamic(() => import("./search-desktop"), {
        loading: () => <p>Loading...</p>,
    });

    return (
        <>
            {isMobile && (
                <Search query={String(q)} />
            )}
            {!isMobile && (
                <SearchDesktop query={String(q)} />
            )}
        </>
    );
}
