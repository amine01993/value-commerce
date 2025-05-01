"use client";

import { useMemo, useState } from "react";
import { RatingGroup } from "@chakra-ui/react";
import { roundToHalf } from "@/utils/helpers";
import style from "./style.module.scss";

export default function ProductRating() {

    const [rating, setRating] = useState(4.6);
    const [ratingCount, setRatingCount] = useState(12);

    const roundedRating = useMemo(() => {
        return roundToHalf(rating);
    }, [rating]);

    return (
        <div className={style.rating}>
            <div className="rating-container">
                <div>{rating}</div>
                <RatingGroup.Root allowHalf count={5} defaultValue={roundedRating} size="sm" colorPalette="yellow">
                    <RatingGroup.HiddenInput />
                    <RatingGroup.Control />
                </RatingGroup.Root>
            </div>
            <div>{ratingCount} rating</div>
        </div>
    );
} 