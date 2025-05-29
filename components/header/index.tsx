import Image from "next/image";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import style from "./style.module.scss";
import logo from "@/public/Logo.png";
import profileIcon from "@/public/user-profile.svg";
import cartIcon from "@/public/cart.svg";
import MenuButton from "./menu-btn";
import SearchNav from "./search-nav";

export default function Header() {
    
    const loggedIn = false;

    return (
        <header className={style.header}>
            <nav className={style.menu}>
                <Link href={"/"} title="Go to home page">
                    <Image src={logo} alt="Website official logo" height={50} priority />
                </Link>

                <ol className={style.right}>
                    <li>
                        <Button variant="plain" aria-label="Show cart">
                            <Image src={cartIcon} alt="Cart Icon" height={25} priority />
                        </Button>
                    </li>
                    {loggedIn && (
                        <li>
                            <Button variant="plain" aria-label="Show user information">
                                <Image src={profileIcon} alt="User profile icon" height={25} priority />
                            </Button>
                        </li>
                    )}
                    <li>
                        <MenuButton />
                    </li>
                </ol>
            </nav>

            <SearchNav />
        </header>
    );
}