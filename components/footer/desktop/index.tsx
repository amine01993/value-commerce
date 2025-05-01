
import Image from "next/image";
import { Button, Heading, Separator } from "@chakra-ui/react";
import style from "./style.module.scss";
import instagram from "@/public/instagram.svg";
import facebook from "@/public/facebook.svg";
import twitter from "@/public/x-twitter.svg";
import globeIcon from "@/public/globe-black.svg";
import logo from "@/public/Logo - Desktop.png";

export default function FooterDesktop() {
    return (
        <footer className={style.footer}>
            <nav>
                <div className={style.section}>
                    <Heading as="div">Value Commerce</Heading>
                    <ul>
                        <li>About</li>
                        <li>Blog</li>
                        <li>Careers</li>
                    </ul>
                </div>

                <div className={style.section}>
                    <Heading as="div">Costumer Service</Heading>
                    <ul>
                        <li>Contact us</li>
                        <li>Shipping & Returns</li>
                        <li>FAQs</li>
                    </ul>
                </div>

                <div className={style.section}>
                    <Heading as="div">Follow Us</Heading>
                    <ul>
                        <li>
                            <Image src={instagram} alt="Instagram" width={20} height={20} />
                            Instagram
                        </li>
                        <li>
                            <Image src={twitter} alt="X (twitter)" width={20} height={20} />
                            X (twitter)
                        </li>
                        <li>
                            <Image src={facebook} alt="Facebook" width={20} height={20} />
                            Facebook
                        </li>
                    </ul>
                </div>
            </nav>

            <Separator bgColor="var(--chakra-colors-gray-300)" />

            <ul className={style.bottom}>
                <li>
                    <Button variant="plain">
                        <Image src={logo} alt="Website official logo" height={50} />  &copy; 2025 Value Commerce, Inc.
                    </Button>
                </li>
                <li>
                    <Button variant="plain">
                        Cookie settings
                    </Button>
                </li>
                <li>
                    <Button variant="plain">
                        <Image src={globeIcon} alt="Globe Icon" height={25} /> English
                    </Button>
                </li>
            </ul>
        </footer>
    );
}
