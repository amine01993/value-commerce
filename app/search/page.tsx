
import { Metadata } from "next";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import Search from "./search";
import SearchDesktop from "./search-desktop";

export const metadata: Metadata = {
	title: "Welcome to Value Commerce",
	description: "Welcome to Value Commerce, where you will have an incredible experience selling your products and also be able to buy fantastic products at great prices.",
};

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
