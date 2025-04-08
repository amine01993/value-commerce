import Link from "next/link";
import Image from "next/image";
import { Button, Input, InputGroup } from "@chakra-ui/react";
import style from "./style.module.scss";
import logo from "@/public/Logo - Desktop.png";
import searchIcon from "@/public/search-black.svg";
import heartIcon from "@/public/heart.svg";
import cartIcon from "@/public/cart.svg";
import globeIcon from "@/public/globe.svg";
import profileIcon from "@/public/user-profile.svg";
import bellIcon from "@/public/bell.svg";

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
                    <InputGroup startElement={<Image src={searchIcon} alt="Search Icon" height={20} />}>
                        <Input placeholder="Search for anything" />
                    </InputGroup>
                    <Button colorPalette={'orange'} variant="solid" className={style['search-btn']}>
                        Search
                    </Button>
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
        </header>
    );
}