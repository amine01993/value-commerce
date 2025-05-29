"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import style from "./style.module.scss";
import drum from "@/public/banners/drum-guy.jpg";
import classic from "@/public/banners/classic-dj.jpg";
import drone from "@/public/banners/drone-and-a-backpack.jpg";
import zara from "@/public/banners/zara-black-amber.jpg";
import chevronLeftIcon from "@/public/chevron-left.svg";
import chevronRightIcon from "@/public/chevron-right.svg";
import pauseIcon from "@/public/pause.svg";
import playIcon from "@/public/play.svg";
import Banner from "./banner";

export default function BannersDesktop() {
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
    const timeInterval = useRef(5000); // 5000 ms
    const timer = useRef(0);
    const [activeIndex, setActiveIndex] = useState(1);
    const [paused, setPaused] = useState(false);
    const instantScroll = useRef(false);
    const isScrolling = useRef(false);

    const togglePause = useCallback(() => {
        if(isScrolling.current) return;
        
        const isPaused = paused;
        setPaused(p => !p);
        if(isPaused) {
            nextItem();
        }
    }, [paused]);

    const nextItem = useCallback(() => {
        if(isScrolling.current) return;

        const nextIndex = activeIndex + 1;
        setActiveIndex(nextIndex);

        timer.current = 0;

        if(listElem.current) {
            const ulRect = listElem.current.getBoundingClientRect();
            listElem.current.scrollBy({
                left: ulRect.width,
                behavior: "smooth",
            });
            isScrolling.current = true;
        }
    }, [activeIndex]);

    const previousItem = useCallback(() => {
        if(isScrolling.current) return;

        const nextIndex = activeIndex - 1;
        setActiveIndex(nextIndex);

        timer.current = 0;

        if(listElem.current) {
            const ulRect = listElem.current.getBoundingClientRect();
            listElem.current.scrollBy({
                left: -ulRect.width,
                behavior: "smooth",
            });
            isScrolling.current = true;
        }
    }, [activeIndex]);

    const handleScrollEnd = useCallback(() => {
        if(isScrolling.current) {
            isScrolling.current = false;
        }

        if(instantScroll.current) {
            instantScroll.current = false;
            return;
        }

        if(activeIndex <= 0) {
            setActiveIndex(data.current.length);

            if(listElem.current) {
                const ulRect = listElem.current.getBoundingClientRect();
                listElem.current.scrollBy({
                    left: ulRect.width * data.current.length,
                    behavior: "instant",
                });
                instantScroll.current = true;
            }
        }
        else if(activeIndex >= data.current.length + 1) {
            setActiveIndex(1);

            if(listElem.current) {
                const ulRect = listElem.current.getBoundingClientRect();
                listElem.current.scroll({
                    left: ulRect.width,
                    behavior: "instant",
                });
                instantScroll.current = true;
            }
        }
    }, [activeIndex]);

    useEffect(() => {
        let interval: number|NodeJS.Timeout|null = null;
        
        if(!paused) {
            interval = setInterval(() => {
                timer.current += 100;
                if(timer.current >= timeInterval.current) {
                    nextItem();
                }
            }, 100);
        }

        if(listElem.current) {
            listElem.current.addEventListener("scrollend", handleScrollEnd);
        }

        return () => {
            if(interval !== null) {
                clearInterval(interval);
            }

            if(listElem.current) {
                listElem.current.removeEventListener("scrollend", handleScrollEnd);
            }
        };
    }, [activeIndex, paused]);

    useEffect(() => {
        if(listElem.current) {
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

            <div className={style.controls}>
                <Button variant="subtle" aria-label="Show previous slide" onClick={previousItem}>
                    <Image src={chevronLeftIcon} alt="Show previous slide" height={16} width={16} priority />
                </Button>
                <Button variant="subtle" aria-label="Show next slide" onClick={nextItem}>
                    <Image src={chevronRightIcon} alt="Show next slide" height={16} width={16} priority />
                </Button>
                {!paused && (
                    <Button variant="subtle" aria-label="Stop moving the banners" onClick={togglePause}>
                        <Image src={pauseIcon} alt="Pause" height={16} width={16} priority />
                    </Button>
                )}
                {paused && (
                    <Button variant="subtle" aria-label="Continue moving the banners" onClick={togglePause}>
                        <Image src={playIcon} alt="Play" height={16} width={16} />
                    </Button>
                )}
            </div>
        </div>
    );
}