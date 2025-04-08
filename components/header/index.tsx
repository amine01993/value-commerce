import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@chakra-ui/react";
import style from "./style.module.scss";
import logo from "@/public/Logo.png";
import profileIcon from "@/public/user-profile.svg";
import cartIcon from "@/public/cart.svg";
import searchIcon from "@/public/search.svg";
import MenuButton from "./menu-btn";

export default function Header() {
    
    const loggedIn = false;

    return (
        <header className={style.header}>
            <nav className={style.menu}>
                <Link href={'/'} title="Go to home page">
                    <Image src={logo} alt="Website official logo" height={50} />
                </Link>

                <ol className={style.right}>
                    <li>
                        <Button variant="plain" aria-label="Show cart">
                            <Image src={cartIcon} alt="Cart Icon" height={25} />
                        </Button>
                    </li>
                    {loggedIn && (
                        <li>
                            <Button variant="plain" aria-label="Show user information">
                                <Image src={profileIcon} alt="User profile icon" height={25} />
                            </Button>
                        </li>
                    )}
                    <li>
                        <MenuButton />
                    </li>
                </ol>
            </nav>

            <div className={style.search}>
                <Input placeholder="Search for anything" size="lg" />
                <Button colorPalette={'orange'} variant="solid" size="lg" aria-label="Search for anything">
                    <Image src={searchIcon} alt="Search Icon" height={25} />
                </Button>
            </div>
        </header>
    );
}