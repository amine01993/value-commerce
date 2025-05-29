"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, Text, Link as LinkUI } from "@chakra-ui/react";
import style from "./style.module.scss";
import profileIcon from "@/public/profile.svg";
import paymentIcon from "@/public/payment.svg";
import addressIcon from "@/public/address.svg";
import preferencesIcon from "@/public/preferences.svg";
import photoIcon from "@/public/photo.svg";
import personalIcon from "@/public/personal-info.svg";

export default function Account({ children }: Readonly<{ children: React.ReactNode; }>) {

    const pathname = usePathname()
    const iconWidth = 17;

    return (
        <div className={style.layout}>
            <div className="menu">
                <aside className="menu-header">
                    <Avatar.Root variant="solid">
                        <Avatar.Fallback name="Amine Errafii" />
                    </Avatar.Root>
                    <Text fontWeight="semibold">Amine Errafii</Text>
                </aside>
                <nav className="menu-nav">
                    <ul>
                        <li className={pathname === "/account/dashboard" ? "active" : undefined}>
                            <LinkUI asChild>
                                <Link href="/account/dashboard">
                                    <Image src={profileIcon} alt="Account Dashboard" width={iconWidth} />
                                    Dashboard
                                </Link>
                            </LinkUI>
                        </li>
                        <li className={pathname === "/account/photo" ? "active" : undefined}>
                            <LinkUI asChild>
                                <Link href="/account/photo">
                                    <Image src={photoIcon} alt="Account Photo" width={iconWidth} />
                                    Photo
                                </Link>
                            </LinkUI>
                        </li>
                        <li className={pathname === "/account/personal-details" ? "active" : undefined}>
                            <LinkUI asChild>
                                <Link href="/account/personal-details">
                                    <Image src={personalIcon} alt="Account Personal Details" width={iconWidth} />
                                    Personal Details
                                </Link>
                            </LinkUI>
                        </li>
                        <li className={pathname === "/account/payment-methods" ? "active" : undefined}>
                            <LinkUI asChild>
                                <Link href="/account/payment-methods">
                                    <Image src={paymentIcon} alt="Account Payment Methods" width={iconWidth} />
                                    Payment Methods
                                </Link>
                            </LinkUI>
                        </li>
                        <li className={pathname === "/account/addresses" ? "active" : undefined}>
                            <LinkUI asChild>
                                <Link href="/account/addresses">
                                    <Image src={addressIcon} alt="Account Addresses" width={iconWidth} />
                                    Addresses
                                </Link>
                            </LinkUI>
                        </li>
                        <li className={pathname === "/account/preference-center" ? "active" : undefined}>
                            <LinkUI asChild>
                                <Link href="/account/preference-center">
                                    <Image src={preferencesIcon} alt="Account Preference Center" width={iconWidth} />
                                    Preference Center
                                </Link>
                            </LinkUI>
                        </li>
                    </ul>
                </nav>
            </div>
            {children}
        </div>
    );
}

