
import { headers } from "next/headers";
import { userAgent } from "next/server";
import Search from "./search";
import SearchDesktop from "./search-desktop";
import {metadata} from "@/app/layout"

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
