"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "@/lib/hooks";
import { setDeviceType, showMenu } from "@/lib/slices/main";
import listIcon from "@/public/list.svg";

export default function MenuButton() {
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setDeviceType("mobile"));
    });
    
    return (
        <Button variant="plain" aria-label="Open Menu" onClick={() => dispatch(showMenu())}>
            <Image src={listIcon} alt="List icon" height={25} priority />
        </Button>
    );
}