"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import drum from "@/public/banners/drum-guy.jpg";
import classic from "@/public/banners/classic-dj.jpg";
import drone from "@/public/banners/drone-and-a-backpack.jpg";
import zara from "@/public/banners/zara-black-amber.jpg";
import Banner from "./banner";

export default function Banners() {
    const data = useRef([
        {
            src: drum,
            alt: "Learn more",
            heading: "Get your order or your money back",
            text: "Shop confidently with eBay Money Back Guarantee.",
            buttonText: "Learn more",
            isPriority: true,
        },
        {
            src: drone,
            alt: "Do your thing",
            heading: "Whatever you're into, it's here",
            text: "Turn a wrench, get a tech upgrade, and find everything you love.",
            buttonText: "Do your thing",
        },
        {
            src: classic,
            alt: "Explore now",
            heading: "There's a deal for you, too",
            text: "Don't miss a chance to save on items you've been looking for.",
            buttonText: "Explore now",
        },
        {
            src: zara,
            alt: "Celebrate and save",
            heading: "Glad you're here, {Firstname}",
            text: "Thanks for letting us be part of your hunt for great finds.",
            buttonText: "Celebrate and save",
        },
    ]);
    const firstItem = useRef(data.current[0]);
    const lastItem = useRef(data.current[data.current.length - 1]);
    const listElem = useRef<HTMLUListElement>(null);
    const timeInterval = useRef(5000); // 3000 ms
    const timer = useRef(0);
    const [activeIndex, setActiveIndex] = useState(1);
    const activeScrollIndex = useRef(1);

    const nextItem = useCallback((diff: number = 0) => {
        const nextIndex = activeIndex + 1;
        setActiveIndex(nextIndex);
        activeScrollIndex.current = nextIndex;

        timer.current = 0;

        if(listElem.current) {
            const ulRect = listElem.current.getBoundingClientRect();
            if(ulRect.width - diff) {
                listElem.current.scrollBy({
                    left: ulRect.width - diff,
                    behavior: "smooth",
                });
            }
            else {
                handleScrollEnd();
            }
        }
    }, [activeIndex]);

    const previousItem = useCallback((diff: number = 0) => {
        const nextIndex = activeIndex - 1;
        setActiveIndex(nextIndex);
        activeScrollIndex.current = nextIndex;

        timer.current = 0;

        if(listElem.current) {
            const ulRect = listElem.current.getBoundingClientRect();
            if(-ulRect.width + diff) {
                listElem.current.scrollBy({
                    left: -ulRect.width + diff,
                    behavior: "smooth",
                });
            }
            else {
                handleScrollEnd();
            }
        }
    }, [activeIndex]);

    const handleScrollEnd = useCallback(() => {
        if(activeScrollIndex.current <= 0) {
            setActiveIndex(data.current.length);
            activeScrollIndex.current = data.current.length;

            if(listElem.current) {
                const ulRect = listElem.current.getBoundingClientRect();
                listElem.current.scrollBy({
                    left: ulRect.width * data.current.length,
                    behavior: "instant",
                });
            }
        }
        else if(activeScrollIndex.current >= data.current.length + 1) {
            setActiveIndex(1);
            activeScrollIndex.current = 1;

            if(listElem.current) {
                const ulRect = listElem.current.getBoundingClientRect();
                listElem.current.scroll({
                    left: ulRect.width,
                    behavior: "instant",
                });
            }
        }
        else if(activeScrollIndex.current > 0 && activeScrollIndex.current < data.current.length + 1) {
            if(listElem.current) {
                const itemElem = listElem.current.querySelector("li:nth-child(" + (activeScrollIndex.current + 1) + ")");
                if(itemElem) {
                    const rect = itemElem.getBoundingClientRect();
                    if(rect.x < 0) {
                        nextItem(-rect.x);
                    }
                    else if(rect.x > 0) {
                        previousItem(rect.x);
                    }
                }
            }
        }
    }, [activeIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            timer.current += 100;
            if(timer.current >= timeInterval.current) {
                let diff = 0;
                if(listElem.current) {
                    const itemElem = listElem.current.querySelector("li:nth-child(" + (activeScrollIndex.current + 1) + ")");
                    if(itemElem) {
                        const rect = itemElem.getBoundingClientRect();
                        diff = rect.x;
                    }
                }

                nextItem(-diff);
            }
        }, 100);

        // scroll event listener
        if(listElem.current) {
            listElem.current.addEventListener("scrollend", handleScrollEnd);
        }

        return () => {
            clearInterval(interval);

            if(listElem.current) {
                listElem.current.removeEventListener("scrollend", handleScrollEnd);
            }
        };
    }, [activeIndex]);

    useEffect(() => {
        if(listElem.current) {
            listElem.current.style.overflowX = "auto";
            listElem.current.style.transform = "none";
            const ulRect = listElem.current.getBoundingClientRect();
            listElem.current.scroll({
                left: ulRect.width,
                behavior: "instant",
            });
        }
    }, []);

    return (
        <div className={style.carousel} aria-roledescription="Carousel" role="Group">
            <div className={style.slides}>
                <ul ref={listElem}>
                    <li aria-hidden={0 === activeIndex ? undefined : true}>
                        <Banner {...lastItem.current} />
                    </li>
                    {data.current.map((item, index) => (
                        <li key={"banner-index" + index} aria-hidden={index + 1 === activeIndex ? undefined : true} 
                            className={Math.abs(activeIndex - (index + 1)) < 2 ? "" : style.hide}>
                            <Banner {...item} />
                        </li>
                    ))}
                    <li aria-hidden={data.current.length + 1 === activeIndex ? undefined : true}>
                        <Banner {...firstItem.current} />
                    </li>
                </ul>
            </div>

            <div className={style.dots}>
                <ul>
                    {data.current.map((item, index) => {
                        let isActive = false;
                        if(activeIndex === 0) {
                            isActive = index === 3;
                        }
                        else if(activeIndex === data.current.length + 1) {
                            isActive = index === 0;
                        }
                        else {
                            isActive = index === activeIndex - 1;
                        }
                        
                        return <li key={"dot-index" + index} className={isActive ? style.active : ""}></li>;
                    })}
                </ul>
            </div>
        </div>
    );
}