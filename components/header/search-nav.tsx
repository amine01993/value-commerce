"use client";

import Image from "next/image";
import { Button, Input } from "@chakra-ui/react";
import { useAppSelector } from "@/lib/hooks";
import style from "./style.module.scss";
import searchIcon from "@/public/search.svg";

export default function SearchNav() {
    
    const query = useAppSelector(state => state.mainSlice.query);

    return (
        <div className={style.search}>
            <Input placeholder="Search for anything" size="lg" defaultValue={query} />
            <Button colorPalette={'orange'} variant="solid" size="lg" aria-label="Search for anything">
                <Image src={searchIcon} alt="Search Icon" height={25} priority />
            </Button>
        </div>
    );
}