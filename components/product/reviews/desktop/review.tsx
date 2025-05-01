
import Image from "next/image";
import { useMemo } from "react";
import { Avatar, Button, RatingGroup, Separator, Text } from "@chakra-ui/react";
import { roundToHalf } from "@/utils/helpers";
import smileyIcon from "@/public/smiley.svg";
import sadIcon from "@/public/sad.svg";
import thumbsUpIcon from "@/public/thumbs-up.svg";
import thumbsDownIcon from "@/public/thumbs-down.svg";


interface ReviewType {
    fullname: string;
    rating: number;
    title: string;
    reviewedAt: Date;
    verifiedPurchase: boolean;
    content: string;
    wouldRecommend: boolean;
    helpfulCount: number;
    notHelpfulCount: number;
}

export default function Review({fullname, rating, title, reviewedAt, verifiedPurchase, content, wouldRecommend, helpfulCount, notHelpfulCount,}: ReviewType) {

    const roundedRating = useMemo(() => {
        return roundToHalf(rating);
    }, [rating]);

    const reviewDate = useMemo(() => {
        return new Intl.DateTimeFormat("en-CA", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(reviewedAt);
    }, [reviewedAt]);
    
    return (
        <div className="review">
            <div className="customer">
                <Avatar.Root variant="solid" size="xl">
                    <Avatar.Fallback name={fullname} />
                </Avatar.Root>
                <Text>{fullname}</Text>
            </div>

            <div className="customer-rating">
                <RatingGroup.Root allowHalf count={5} defaultValue={roundedRating} size="sm" colorPalette="yellow">
                    <RatingGroup.HiddenInput />
                    <RatingGroup.Control />
                </RatingGroup.Root>
                <Text fontWeight="semibold">{title}</Text>
            </div>

            <Text color="var(--chakra-colors-gray-700)">Reviewed on {reviewDate}</Text>
            
            {verifiedPurchase && <Text fontWeight="semibold" color="var(--chakra-colors-orange-400)">Verified Purchase</Text>}
            
            <Text className="customer-content">{content}</Text>

            {wouldRecommend && (
                <div className="recommendation">
                    <Image src={smileyIcon} alt="Smiley Face" width={25} height={25} />
                    <Text><b>Yes,</b> I would recommend this to a friend.</Text>
                </div>
            )}
            {!wouldRecommend && (
                <div className="recommendation">
                    <Image src={sadIcon} alt="Sad Face" width={25} height={25} />
                    <Text><b>No,</b> I would not recommend this to a friend.</Text>
                </div>
            )}

            <div className="actions">
                <Button variant="plain" color="var(--chakra-colors-orange-600)" fontWeight="semibold">
                    <Image src={thumbsUpIcon} alt="Thumbs Up" width={20} height={20} />
                    Helpful{helpfulCount > 0 ? ` (${helpfulCount})` : ""}
                </Button>
                <Button variant="plain" color="var(--chakra-colors-orange-600)" fontWeight="semibold">
                    <Image src={thumbsDownIcon} alt="Thumbs Down" width={20} height={20} />
                    Not helpful{notHelpfulCount > 0 ? ` (${notHelpfulCount})` : ""}
                </Button>
                <Button variant="plain" color="var(--chakra-colors-orange-600)" fontWeight="semibold">
                    Report
                </Button>
            </div>

            <Separator bgColor="var(--chakra-colors-gray-300)" />
        </div>
    )
}