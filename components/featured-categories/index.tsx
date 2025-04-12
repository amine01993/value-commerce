"use client";

import { useRef } from "react";
import { Heading } from "@chakra-ui/react";
import style from "./style.module.scss";
import Category from "./category";
import art from "@/public/categories/art.jpg";
import sneakers from "@/public/categories/sneakers.jpg";
import sports from "@/public/categories/sports.jpg";
import gameBoards from "@/public/categories/game-boards.jpg";
import luxury from "@/public/categories/luxury.jpg";
import toys from "@/public/categories/toys.jpg";

export default function FeaturedCategories() {

    const data = useRef([
        {
            src: art,
            alt: "Art",
            heading: "Art",
            isPriority: true,
        },
        {
            src: sneakers,
            alt: "Sneakers",
            heading: "Sneakers",
            isPriority: true,
        },
        {
            src: sports,
            alt: "Sports",
            heading: "Sports",
            isPriority: true,
        },
        {
            src: gameBoards,
            alt: "Game Boars",
            heading: "Game Boars",
            isPriority: true,
        },
        {
            src: luxury,
            alt: "Luxury",
            heading: "Luxury",
            isPriority: true,
        },
        {
            src: toys,
            alt: "Toys",
            heading: "Toys",
            isPriority: true,
        },
    ]);

    return (
        <section className={style.categories}>
            <Heading as="h2">Featured Categories</Heading>
            <ul>
                {data.current.map((item, index) => (
                    <li key={"featured-category-index-" + index}>
                        <Category {...item} />
                    </li>
                ))}
            </ul>
        </section>
    );
}