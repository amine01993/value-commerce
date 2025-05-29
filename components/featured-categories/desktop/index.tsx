"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Heading } from "@chakra-ui/react";
import style from "./style.module.scss";
import Category from "./category";
import art from "@/public/categories/art.jpg";
import sneakers from "@/public/categories/sneakers.jpg";
import sports from "@/public/categories/sports.jpg";
import gameBoards from "@/public/categories/game-boards.jpg";
import luxury from "@/public/categories/luxury.jpg";
import toys from "@/public/categories/toys.jpg";
import electronics from "@/public/categories/electronics.jpg";
import chevronLeftIcon from "@/public/chevron-left.svg";
import chevronRightIcon from "@/public/chevron-right.svg";

export default function FeaturedCategoriesDesktop() {

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
        {
            src: electronics,
            alt: "Electronics",
            heading: "Electronics",
            isPriority: true,
        },
    ]);

    const listRef = useRef<HTMLUListElement>(null);

    const [carouselStart, setCarouselStart] = useState(true);
    const [carouselEnd, setCarouselEnd] = useState(false);

    const scrollLeft = useCallback(() => {
        if(listRef.current) {
            const liRect = listRef.current.getBoundingClientRect();
            let itemRect: null|DOMRect = null;
            listRef.current.querySelectorAll("li").forEach((li) => {
                const rect = li.getBoundingClientRect();
                if(rect.x < liRect.x) {
                    itemRect = rect;
                }
            });

            if(itemRect) {
                listRef.current.scrollBy({
                    left: -(liRect.x - (itemRect as DOMRect).x + liRect.width - (itemRect as DOMRect).width),
                    behavior: "smooth",
                });
            }
        }
    }, []);

    const scrollRight = useCallback(() => {
        if(listRef.current) {
            const liRect = listRef.current.getBoundingClientRect();
            let itemRect: null|DOMRect = null;
            listRef.current.querySelectorAll("li").forEach((li) => {
                const rect = li.getBoundingClientRect();
                if(!itemRect && rect.right >= liRect.right) {
                    itemRect = rect;
                }
            });

            if(itemRect) {
                listRef.current.scrollBy({
                    left: (itemRect as DOMRect).x,
                    behavior: "smooth",
                });
            }
        }
    }, []);

    const handleScrollEnd = useCallback(() => {
        if(listRef.current) {
            const liRect = listRef.current.getBoundingClientRect();
            const firstElem = listRef.current.querySelector("li");
            const lastElem = listRef.current.querySelector("li:last-child");

            if(!firstElem || liRect.x === firstElem.getBoundingClientRect().x) {
                setCarouselStart(true);
            }
            else {
                setCarouselStart(false);
            }

            if(!lastElem || liRect.right === lastElem.getBoundingClientRect().right) {
                setCarouselEnd(true);
            }
            else {
                setCarouselEnd(false);
            }
        }
    }, []);

    useEffect(() => {
        if(listRef.current) {
            listRef.current.addEventListener("scrollend", handleScrollEnd);
        }

        return () => {
            if(listRef.current) {
                listRef.current.removeEventListener("scrollend", handleScrollEnd);
            }
        };
    });

    return (
        <section className={style.categories}>
            <Heading as="h2">Featured Categories</Heading>
            <div className={style.carousel}>
                <ul ref={listRef}>
                    {data.current.map((item, index) => (
                        <li key={"featured-category-index-" + index}>
                            <Category {...item} />
                        </li>
                    ))}
                </ul>
                
                <Button variant="subtle" aria-label="Show previous items" onClick={scrollLeft} className={style["left-control"] + " " + (carouselStart ? style.hide : "")}>
                    <Image src={chevronLeftIcon} alt="Show previous items" height={16} width={16} />
                </Button>
                <Button variant="subtle" aria-label="Show next items" onClick={scrollRight} className={style["right-control"] + " " + (carouselEnd ? style.hide : "")}>
                    <Image src={chevronRightIcon} alt="Show next items" height={16} width={16} />
                </Button>
            </div>
        </section>
    );
}