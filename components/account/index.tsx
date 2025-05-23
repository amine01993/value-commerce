"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, Text } from "@chakra-ui/react";
import style from "./style.module.scss";
import profileIcon from "@/public/profile.svg";
import paymentIcon from "@/public/payment.svg";
import addressIcon from "@/public/address.svg";
import preferencesIcon from "@/public/preferences.svg";
import photoIcon from "@/public/photo.svg";
import personalIcon from "@/public/personal-info.svg";

export default function Account({ children }: Readonly<{ children: React.ReactNode; }>) {

    const pathname = usePathname()
    const iconWidth = 20;

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
                            <Link href="/account/dashboard">
                                <Image src={profileIcon} alt="Account Dashboard" width={iconWidth} />
                                Dashboard
                            </Link>
                        </li>
                        <li className={pathname === "/account/photo" ? "active" : undefined}>
                            <Link href="/account/photo">
                                <Image src={photoIcon} alt="Account Photo" width={iconWidth} />
                                Photo
                            </Link>
                        </li>
                        <li className={pathname === "/account/personal-details" ? "active" : undefined}>
                            <Link href="/account/personal-details">
                                <Image src={personalIcon} alt="Account Personal Details" width={iconWidth} />
                                Personal Details
                            </Link>
                        </li>
                        <li className={pathname === "/account/payment-methods" ? "active" : undefined}>
                            <Link href="/account/payment-methods">
                                <Image src={paymentIcon} alt="Account Payment Methods" width={iconWidth} />
                                Payment Methods
                            </Link>
                        </li>
                        <li className={pathname === "/account/addresses" ? "active" : undefined}>
                            <Link href="/account/addresses">
                                <Image src={addressIcon} alt="Account Addresses" width={iconWidth} />
                                Addresses
                            </Link>
                        </li>
                        <li className={pathname === "/account/preference-center" ? "active" : undefined}>
                            <Link href="/account/preference-center">
                                <Image src={preferencesIcon} alt="Account Preference Center" width={iconWidth} />
                                Preference Center
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            {children}
        </div>
    );
}

