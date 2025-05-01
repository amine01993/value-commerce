"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setSearchQuery } from "@/lib/slices/main";
import style from "./search.module.scss";
import SortAndFilter from "@/components/search/sort-and-filter";
import Listing from "@/components/search/listing";
import Related from "@/components/search/related";

interface SearchParams {
    query: string;
}

export default function Search({query}: SearchParams) {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSearchQuery(query));
    }, [query]);

    return (
        <main className={style.page}>
            <SortAndFilter />
            <Listing />
            <Related />
        </main>
    );
}