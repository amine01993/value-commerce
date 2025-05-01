"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { RatingGroup, Text } from "@chakra-ui/react";
import { roundToHalf } from "@/utils/helpers";
import style from "./style.module.scss";
import chevonDownIcon from "@/public/chevron-down.svg";

export default function ProductRating() {

    const [rating, setRating] = useState(4.6);
    const [ratingCount, setRatingCount] = useState(12);

    const roundedRating = useMemo(() => {
        return roundToHalf(rating);
    }, [rating]);

    return (
        <div className={style.rating}>
            <div className="rating-container">
                <Text>{rating}</Text>
                <RatingGroup.Root allowHalf count={5} defaultValue={roundedRating} size="sm" colorPalette="yellow">
                    <RatingGroup.HiddenInput />
                    <RatingGroup.Control />
                </RatingGroup.Root>
                <Image src={chevonDownIcon} alt="Down arrow" priority height={16} width={16} />
            </div>
            <Text>{ratingCount} rating</Text>
        </div>
    );
} 