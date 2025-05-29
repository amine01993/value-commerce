"use client";

import { useRef, useState } from "react";
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

    const [selectedIndex, setSelectedIndex] = useState(0);
    
    function handleSlideClick(index: number) {
        if(index > -1 && index < data.current.length) {
            setSelectedIndex(index);
        }
    }

    return (
        <div className={style.slider}>
            <div className="main-slide">
                <Image src={data.current[selectedIndex].img} alt="Main product slide" className="main-image" priority />
                <Button className="favorite-btn" variant="plain" aria-label="Add this product to favorites">
                    <Image src={favoriteIcon} alt="Favorite Icon" height={16} width={16} priority />
                </Button>
            </div>
            <div className="slide-index">{selectedIndex + 1} of {data.current.length}</div>
            <div className="slides">
                <ol>
                    {data.current.map((slide, index) => (
                        <li key={"slide-" + index} onClick={() => handleSlideClick(index)}>
                            <Image src={slide.img} alt={slide.alt} priority className={index === selectedIndex ? "active" : undefined} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
} 