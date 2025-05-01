"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setSearchQuery } from "@/lib/slices/main";
import { Heading } from "@chakra-ui/react";
import style from "./search-desktop.module.scss";
import Listing from "@/components/search/listing/desktop";
import Related from "@/components/search/related/desktop";
import Filters from "@/components/search/sort-and-filter/desktop/filters";

interface SearchParams {
    query: string;
}

export default function SearchDesktop({query}: SearchParams) {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSearchQuery(query));
    }, [query]);

    return (
        <main className={style.page}>
            <Heading as="h1" size="lg">Search Results For: {query}</Heading>
            <div className="container">
                <Filters />
                <div className="right-section">
                    <Listing />
                    <Related />
                </div>
            </div>
        </main>
    );
}