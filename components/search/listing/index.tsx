
import { Button, Heading, Text } from "@chakra-ui/react";
import { useRef } from "react";
import style from "./style.module.scss";
import r1 from "@/public/results/result-1.jpg";
import r2 from "@/public/results/result-2.jpeg";
import r3 from "@/public/results/result-3.png";
import r4 from "@/public/results/result-4.jpeg";
import r5 from "@/public/results/result-5.jpeg";
import r6 from "@/public/results/result-6.png";
import r7 from "@/public/results/result-7.png";
import SearchItem from "./search-item";

export default function Listing() {

    const results = useRef([
        {
            src: r1,
            name: "Refurbished (Excellent) - Dell Latitude 7480 Laptop 14\" Core i5 6300U 8GB RAM 256GB SSD Win10 Pro WiFi",
            rating: 4.5,
            reviewCount: 2,
            price: 209.42,
            oldPrice: 250.99,
        },
        {
            src: r2,
            name: "Refurbished (Excellent) - Dell Latitude 7490 Laptop 14\" (Intel Core i5-7300U/256GB SSD/16GB RAM/Windows 11)",
            rating: 0,
            reviewCount: 0,
            price: 224.68,
        },
        {
            src: r3,
            name: "Refurbished (Fair) - DELL Latitude E7480 UltraBook i5-6300U, 16GB, 256GB SSD, 14\"HD (1366x768), WEBCAM, WiFi, BT 4.2",
            rating: 4.5,
            reviewCount: 0,
            price: 230,
        },
        {
            src: r4,
            name: "Dell Latitude 5400 14\" Laptop – Intel Core i5-8365U (8th Gen), 16GB RAM, 256GB SSD, FHD (1920x1080), Windows 11 Pro – Refurbished (Excellent Condition)",
            rating: 0,
            reviewCount: 0,
            price: 299,
            oldPrice: 600,
        },
        {
            src: r5,
            name: "Refurbished (Excellent) - Dell Latitude 7480 14\" Laptop - Intel Core i5-6300U @ 2.40GHz - 8GB RAM - 256GB SSD - Windows 10 Pro - Certified Refurbished",
            rating: 0,
            reviewCount: 0,
            price: 229.99,
            oldPrice: 270,
        },
        {
            src: r6,
            name: "Refurbished (Excellent) - Dell Latitude E7470 14\" Laptop (Intel Core i5-6300U/16GB RAM/256GB SSD/Windows 10 Pro)",
            rating: 0,
            reviewCount: 0,
            price: 265,
        },
        {
            src: r7,
            name: "Dell Chromebook 11 CB1C13 11.6\" Laptop Intel Celeron 2955U 1.40GHz 4GB 16GB SSD, Comes with Brand New Mpow X3 Airbuds - Refurbished (Good)",
            rating: 2.9,
            reviewCount: 13,
            price: 90,
            oldPrice: 210,
        },
    ]);

    return (
        <section className={style.listing}>
            <Heading as="h2" size="md" fontWeight="normal" className="count">42 results</Heading>
            <ol>
                {results.current.map((item, index) => (
                    <li key={"index-" + index}>
                        <SearchItem {...item} />
                    </li>
                ))}
            </ol>

            <Button colorPalette="orange" className="load-more">Show more</Button>
        </section>
    );
}
