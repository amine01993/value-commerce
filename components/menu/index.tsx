"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Avatar, Button, Heading } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { hideMenu } from "@/lib/slices/main";
import style from "./style.module.scss";
import globeIcon from "@/public/globe.svg";

export default function Menu() {

    const dispatch = useAppDispatch();
    const isMenuOpen = useAppSelector(state => state.mainSlice.openMenu);
    const loggedIn = false;

    useEffect(() => {
        if(isMenuOpen) document.documentElement.style.overflow = "hidden";
        else document.documentElement.style.overflow = "";
    }, [isMenuOpen]);
    
    return (
        <>
        <div className={style.backdrop + ' ' + (isMenuOpen ? style.open : '')} onClick={() => dispatch(hideMenu())}></div>
        <nav className={style.menu + ' ' + (isMenuOpen ? style.open : '')}>
            <ol>
                {loggedIn && (
                    <li className={style.user}>
                        <Avatar.Root variant="solid" size="lg">
                            <Avatar.Fallback name="John Doe" />
                        </Avatar.Root>
                        <div className={style.info}>
                            <p><em>Hi, John Doe</em></p>
                            <p>Welcome back</p>
                        </div>
                    </li>
                )}
                {!loggedIn && (
                    <>
                    <li className={style.item}>
                        <Button variant="plain">Login In</Button>
                    </li>
                    <li className={style.item}>
                        <Button variant="plain">Sign Up</Button>
                    </li>
                    </>
                )}
                
                <li className={style.title}>
                    <Heading as="h3" size="md">Most Popular</Heading>
                </li>
                <li className={style.item}>
                    <Button variant="plain">Home</Button>
                </li>
                <li className={style.item}>
                    <Button variant="plain">Books</Button>
                </li>
                <li className={style.item}>
                    <Button variant="plain">Electronics</Button>
                </li>
                <li className={style.item}>
                    <Button variant="plain">Clothes</Button>
                </li>
                <li className={style.item}>
                    <Button variant="plain">Outdoors</Button>
                </li>
                <li className={style.item}>
                    <Button variant="plain">Sports</Button>
                </li>
                <li className={style.title}>
                    <Heading as="h3" size="md">More</Heading>
                </li>
                <li className={style.item}>
                    <Button variant="plain">Help and Support</Button>
                </li>
                <li className={style.localization}>
                    <Button colorPalette={'orange'} variant="outline">
                        <Image src={globeIcon} alt="Globe Icon" height={25} /> English
                    </Button>
                </li>
            </ol>
        </nav>
        </>
    );
}