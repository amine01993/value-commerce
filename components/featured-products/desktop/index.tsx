"use client";

import { useRef } from "react";
import { Heading } from "@chakra-ui/react";
import style from "./style.module.scss";
import Product from "./product";
import beauty from "@/public/products/beauty.jpg";
import headphones from "@/public/products/headphones.jpg";
import perfume from "@/public/products/perfume.jpg";
import smartWatch from "@/public/products/smart-watch.jpg";
import sneaker from "@/public/products/sneaker.jpg";
import watch from "@/public/products/watch.jpg";
import perfume2 from "@/public/products/perfume2.jpg";
import sneaker2 from "@/public/products/sneaker2.jpg";


export default function FeaturedProductsDesktop() {

    const data = useRef([
        {
            src: beauty,
            alt: "Face Mask Set-12 Packs Hydrating Facial Sheet Mask", 
            title: "Face Mask Set-12 Packs Hydrating Facial Sheet Mask", 
            price: 16.99,
            discountedPrice: 10.49,
        },
        {
            src: headphones,
            alt: "Sony WH-CH520 Wireless Headphones Bluetooth On-Ear Headset with Microphones",
            title: "Sony WH-CH520 Wireless Headphones Bluetooth On-Ear Headset with Microphones",
            price: 69.98,
        },
        {
            src: perfume,
            alt: "Clinique Happy Heart Eau de Parfum Spray",
            title: "Clinique Happy Heart Eau de Parfum Spray",
            price: 108,
        },
        {
            src: smartWatch,
            alt: "Smart Watch for Men Women",
            title: "Smart Watch for Men Women",
            price: 159.99,
            discountedPrice: 49.99,
        },
        {
            src: sneaker,
            alt: "Womens Loven Sneakers Sneaker",
            title: "Womens Loven Sneakers Sneaker",
            price: 49.69,
        },
        {
            src: watch,
            alt: "Men's Quartz Resin Casual Watch",
            title: "Men's Quartz Resin Casual Watch",
            price: 19,
        },
        {
            src: sneaker2,
            alt: "Air Running Shoes",
            title: "Air Running Shoes",
            price: 50.99,
        },
        {
            src: perfume2,
            alt: "Clinique Happy Eau de Parfum Spray",
            title: "Clinique Happy Eau de Parfum Spray",
            price: 120,
            discountedPrice: 70,
        },
    ]);

    return (
        <section className={style.products}>
            <Heading as="h2">Featured Products</Heading>
            <ul>
                {data.current.map((item, index) => (
                    <li key={"featured-product-index-" + index}>
                        <Product {...item} />
                    </li>
                ))}
            </ul>
        </section>
    );
}