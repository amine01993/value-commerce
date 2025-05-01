import Link from "next/link";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import style from "./style.module.scss";
import logo from "@/public/Logo - Desktop.png";
import heartIcon from "@/public/heart.svg";
import cartIcon from "@/public/cart.svg";
import globeIcon from "@/public/globe.svg";
import profileIcon from "@/public/user-profile.svg";
import bellIcon from "@/public/bell.svg";
import SubMenu from "./submenu";
import SearchNav from "./search-nav";

export default function HeaderDesktop() {

    const loggedIn = false;

    return (
        <header className={style.header}>
            <div className={style.main}>
                <Link href={'/'} title="Go to home page">
                    <Image src={logo} alt="Website official logo" height={70} />
                </Link>

                <div className={style.search}>
                    <Button colorPalette="orange" variant="ghost">
                        Explore
                    </Button>
                    <SearchNav />
                </div>

                <nav className={style.menu + ' ' + (loggedIn ? '' : style['logged-out'])}>
                    <ol>
                        {!loggedIn && (
                            <>
                            <li>
                                <Button colorPalette="orange" variant="ghost" aria-label="Show cart">
                                    <Image src={cartIcon} alt="Cart Icon" height={25} />
                                </Button>
                            </li>
                            <li>
                                <Button colorPalette="orange" variant="outline">
                                    Log in
                                </Button>
                            </li>
                            <li>
                                <Button colorPalette="orange" variant="solid">
                                    Sign up
                                </Button>
                            </li>
                            <li>
                                <Button colorPalette="orange" variant="outline" aria-label="Click to select a langage">
                                    <Image src={globeIcon} alt="Globe Icon" height={25} />
                                </Button>
                            </li>
                            </>
                        )}
                        {loggedIn && (
                            <>
                            <li>
                                <Button colorPalette="orange" variant="ghost" aria-label="Show favorite items">
                                    <Image src={heartIcon} alt="Heart Icon" height={25} />
                                </Button>
                            </li>
                            <li>
                                <Button colorPalette="orange" variant="ghost" aria-label="Show cart">
                                    <Image src={cartIcon} alt="Cart Icon" height={25} />
                                </Button>
                            </li>
                            <li>
                                <Button colorPalette="orange" variant="ghost" aria-label="Show notifications">
                                    <Image src={bellIcon} alt="Bell Icon" height={25} />
                                </Button>
                            </li>
                            <li>
                                <Button colorPalette="orange" variant="ghost" aria-label="Show user information">
                                    <Image src={profileIcon} alt="User profile icon" height={25} />
                                </Button>
                            </li>
                            </>
                        )}
                    </ol>
                </nav>
            </div>

            <SubMenu />
        </header>
    );
}