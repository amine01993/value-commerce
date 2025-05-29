"use client";

import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "@/lib/hooks";
import { setDeviceType } from "@/lib/slices/main";
import style from "./style.module.scss";

export default function SubMenu() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setDeviceType("desktop"));
    });

    return (
        <nav className={style.submenu}>
            <ol>
                <li>
                    <Button colorPalette="orange" variant="ghost">Home</Button>
                </li>
                <li>
                    <Button colorPalette="orange" variant="ghost">Books</Button>
                </li>
                <li>
                    <Button colorPalette="orange" variant="ghost">Electronics</Button>
                </li>
                <li>
                    <Button colorPalette="orange" variant="ghost">Clothes</Button>
                </li>
                <li>
                    <Button colorPalette="orange" variant="ghost">Outdoors</Button>
                </li>
                <li>
                    <Button colorPalette="orange" variant="ghost">Sports</Button>
                </li>
            </ol>
        </nav>
    );
}