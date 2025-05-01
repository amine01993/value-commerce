
import Image, { StaticImageData } from "next/image";
import { useMemo } from "react";
import { roundToHalf } from "@/utils/helpers";
import { Button, Heading, RatingGroup, Text } from "@chakra-ui/react";
import favoriteIcon from "@/public/heart.svg";

interface SearchItemType {
    src: StaticImageData;
    name: string;
    rating: number;
    reviewCount: number;
    price: number;
    oldPrice?: number;
}

export default function SearchItem({src, name, rating, reviewCount, price, oldPrice}: SearchItemType) {

    const roundedRating = useMemo(() => {
        return roundToHalf(rating);
    }, [rating]);

    return (
        <>
        <div className="search-item">
            <div className="product-img">
                <Image src={src} alt={name} width={250} height={250} />
                <Button className="favorite-btn" variant="plain" aria-label="Add this product to favorites">
                    <Image src={favoriteIcon} alt="Favorite Icon" height={16} width={16} priority />
                </Button>
            </div>
            <div className="info">
                <Heading as="h3" size="md" fontWeight="normal">{name}</Heading>
                <div className="rating-container">
                    <RatingGroup.Root allowHalf count={5} defaultValue={roundedRating} size="sm" colorPalette="yellow">
                        <RatingGroup.HiddenInput />
                        <RatingGroup.Control />
                    </RatingGroup.Root>
                    <Text color="var(--chakra-colors-gray-600)">({reviewCount}) Reviews</Text>
                </div>
                <div className="price-container">
                    <Text fontWeight="semibold" textStyle="xl">${price}</Text>
                    {oldPrice && <Text color="var(--chakra-colors-gray-600)">Was <span className="old-price">${oldPrice}</span></Text>}
                </div>
            </div>
        </div>
        </>
    )
}
