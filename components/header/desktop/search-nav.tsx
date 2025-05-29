"use client";

import Image from "next/image";
import { Button, Input, InputGroup } from "@chakra-ui/react";
import { useAppSelector } from "@/lib/hooks";
import style from "./style.module.scss";
import searchIcon from "@/public/search-black.svg";

export default function SearchNav() {
    
    const query = useAppSelector(state => state.mainSlice.query);

    return (
        <>
            <InputGroup startElement={<Image src={searchIcon} alt="Search Icon" height={20} />}>
                <Input placeholder="Search for anything" defaultValue={query} />
            </InputGroup>
            <Button colorPalette="orange" variant="solid" className={style["search-btn"]}>
            Search
            </Button>
        </>
    );
}