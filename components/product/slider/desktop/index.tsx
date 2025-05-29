"use client";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import style from "./style.module.scss";
import slide0 from "@/public/product-slides/slide-0.webp";
import slide1 from "@/public/product-slides/slide-1.webp";
import slide2 from "@/public/product-slides/slide-2.webp";
import slide3 from "@/public/product-slides/slide-3.webp";
import slide4 from "@/public/product-slides/slide-4.webp";
import slide5 from "@/public/product-slides/slide-5.webp";
import slide6 from "@/public/product-slides/slide-6.webp";
import slide7 from "@/public/product-slides/slide-7.webp";
import slide8 from "@/public/product-slides/slide-8.webp";
import slide9 from "@/public/product-slides/slide-9.webp";
import slide10 from "@/public/product-slides/slide-10.webp";
import slide11 from "@/public/product-slides/slide-11.webp";
import slide12 from "@/public/product-slides/slide-12.webp";
import slide13 from "@/public/product-slides/slide-13.webp";
import favoriteIcon from "@/public/heart.svg";
import expandIcon from "@/public/expand.svg";
import chevronLeftIcon from "@/public/chevron-left.svg";
import chevronRightIcon from "@/public/chevron-right.svg";

export default function ProductSlider() {

    const data = useRef([
        {
            img: slide0,
            alt: "Slide 0",
        },
        {
            img: slide1,
            alt: "Slide 1",
        },
        {
            img: slide2,
            alt: "Slide 2",
        },
        {
            img: slide3,
            alt: "Slide 3",
        },
        {
            img: slide4,
            alt: "Slide 4",
        },
        {
            img: slide5,
            alt: "Slide 5",
        },
        {
            img: slide6,
            alt: "Slide 6",
        },
        {
            img: slide7,
            alt: "Slide 7",
        },
        {
            img: slide8,
            alt: "Slide 8",
        },
        {
            img: slide9,
            alt: "Slide 9",
        },
        {
            img: slide10,
            alt: "Slide 10",
        },
        {
            img: slide11,
            alt: "Slide 11",
        },
        {
            img: slide12,
            alt: "Slide 12",
        },
        {
            img: slide13,
            alt: "Slide 13",
        },
    ]);
    const olList = useRef<HTMLOListElement>(null);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSlideFocus = useCallback((index: number) => {
        if(index > -1 && index < data.current.length) {
            setSelectedIndex(index);
        }
    }, []);

    const nextSlide = useCallback(() => {
        setSelectedIndex(index => {
            if(index < data.current.length - 1) return index + 1;
            return data.current.length - 1;
        });
    }, [selectedIndex]);

    const previousSlide = useCallback(() => {
        setSelectedIndex(index => {
            if(index > 0) return index - 1;
            return 0;
        });
    }, [selectedIndex]);

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLOListElement>) => {
        
        if(["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) {
            event.preventDefault();
        }

        if(event.key === "ArrowLeft") {
            const elem = olList.current?.querySelector("li:nth-child(" + (selectedIndex + 1) + ")");
            if(elem) {
                (elem.previousElementSibling as HTMLLIElement)?.focus();
            }
        }
        else if(event.key === "ArrowRight") {
            const elem = olList.current?.querySelector("li:nth-child(" + (selectedIndex + 1) + ")");
            if(elem) {
                (elem.nextElementSibling as HTMLLIElement)?.focus();
            }
        }
        
    }, [selectedIndex]);

    const handleSlideSelection = useCallback(() => {
        if(olList.current) {
            const rect = olList.current.getBoundingClientRect();
            const elem = olList.current.querySelector("li:nth-child(" + (selectedIndex + 1) + ")");
            if(elem) {
                const liRect = elem.getBoundingClientRect();
                
                if(liRect.x < rect.x) {
                    olList.current.scrollBy({
                        left: liRect.x - rect.x,
                        behavior: "smooth",
                    });
                }
                else if(liRect.right > rect.right) {
                    olList.current.scrollBy({
                        left: liRect.x - rect.x,
                        behavior: "smooth",
                    });
                }
            }
        }
    }, [selectedIndex]);

    useEffect(() => {
        handleSlideSelection();
    }, [selectedIndex]);

    return (
        <div className={style.slider}>
            <div className="main-slide">
                <Image src={data.current[selectedIndex].img} alt="Main product slide" fill className="main-image" priority />

                <Button className="favorite-btn" variant="plain" aria-label="Add this product to favorites">
                    <Image src={favoriteIcon} alt="Favorite Icon" height={16} width={16} priority />
                </Button>
                <Button className="expand-btn" variant="plain" aria-label="Expand slider to gallery">
                    <Image src={expandIcon} alt="Expand Icon" height={16} width={16} priority />
                </Button>
                {selectedIndex > 0 && (
                    <Button className="arrow-left-btn" variant="plain" aria-label="Show the previous slide" onClick={previousSlide}>
                        <Image src={chevronLeftIcon} alt="Left arrow Icon" height={16} width={16} priority />
                    </Button>
                )}
                {selectedIndex < data.current.length - 1 && (
                    <Button className="arrow-right-btn" variant="plain" aria-label="Show the next slide" onClick={nextSlide}>
                        <Image src={chevronRightIcon} alt="Right arrow Icon" height={16} width={16} priority />
                    </Button>
                )}
            </div>
            <div className="slide-index">{selectedIndex + 1} of {data.current.length}</div>
            <div className="slides">
                <ol ref={olList} onKeyDown={handleKeyDown}>
                    {data.current.map((slide, index) => (
                        <li key={"slide-" + index} onFocus={() => handleSlideFocus(index)} tabIndex={0}>
                            <Image src={slide.img} alt={slide.alt} height={118} width={118} priority className={index === selectedIndex ? "active" : undefined} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
} 