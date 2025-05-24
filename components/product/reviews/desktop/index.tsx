"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Accordion, Button, ButtonGroup, createListCollection, Heading, Portal, Progress, RatingGroup, Select, Separator, Switch, Text } from "@chakra-ui/react";
import { roundToHalf } from "@/utils/helpers";
import style from "./style.module.scss";
import smileyIcon from "@/public/smiley.svg";
import Review from "./review";

export default function ProductReviews() {

    const stars = useRef([
        {
            nbr: 5,
            percentage: 75,
        },
        {
            nbr: 4,
            percentage: 9,
        },
        {
            nbr: 3,
            percentage: 1,
        },
        {
            nbr: 2,
            percentage: 2,
        },
        {
            nbr: 1,
            percentage: 13,
        },
    ]);

    const sortTypes = useRef(createListCollection({
        items: [
            { label: "Most Relevant", value: "relevancy" },
            { label: "Most Helpful", value: "helpfulness" },
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
            { label: "Highest Rating", value: "highestRating" },
            { label: "Lowest Rating", value: "lowestRating" },
        ],
    }));

    const reviews = useRef([
        {
            fullname: "Jackie Chan",
            rating: 3.6,
            title: "Awesome Title",
            reviewedAt: new Date(),
            verifiedPurchase: true,
            content: "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. ena.",
            wouldRecommend: false,
            helpfulCount: 90,
            notHelpfulCount: 68,
        },
        {
            fullname: "Zach Thompson",
            rating: 4.8,
            title: "Some Title",
            reviewedAt: new Date("2023-12-17T13:24:00"),
            verifiedPurchase: false,
            content: "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. ena.",
            wouldRecommend: true,
            helpfulCount: 17,
            notHelpfulCount: 0,
        },
    ]);

    const [rating, setRating] = useState(4.6);
    const [ratingCount, setRatingCount] = useState(12);

    const roundedRating = useMemo(() => {
        return roundToHalf(rating);
    }, [rating]);

    return (
        <section className={style.reviews}>

        <Accordion.Root collapsible defaultValue={["reviews"]} variant="plain">
            <Accordion.Item value="reviews">
                <Accordion.ItemTrigger>
                    <Heading as="h2" size="xl">Customer Reviews</Heading>
                    <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                    <Accordion.ItemBody className="content">
                        <div className="rating-wrapper">
                            <div>
                                <Heading as="h3" size="lg">Ratings</Heading>
                                <div className="rating-container">
                                    <div>{rating}</div>
                                    <RatingGroup.Root allowHalf count={5} defaultValue={roundedRating} size="sm" colorPalette="yellow">
                                        <RatingGroup.HiddenInput />
                                        <RatingGroup.Control />
                                    </RatingGroup.Root>
                                </div>
                                <Text color="var(--chakra-colors-gray-700)">Average rating based on {ratingCount} reviews</Text>

                                <Text fontWeight="semibold" className="breakdown">Rating Breakdown</Text>
                                <ol className="breakdown-list">
                                    {stars.current.map((item, ) => (
                                        <li key={"rating-" + item.nbr}>
                                            <Text>{item.nbr} star</Text>
                                            <Progress.Root size="lg" colorPalette="yellow" defaultValue={item.percentage}>
                                                <Progress.Track>
                                                    <Progress.Range />
                                                </Progress.Track>
                                            </Progress.Root>
                                            <Text>{item.percentage}%</Text>
                                        </li>
                                    ))}
                                </ol>

                                <Button variant="outline" colorPalette="orange" size="lg" className="write-btn">Write Your Review</Button>
                            </div>

                            <Separator orientation="vertical" bgColor="var(--chakra-colors-gray-300)" />
                            
                            <div>
                                <Heading as="h3" size="lg">Reviewer Recommendation</Heading>
                                <div className="rating-summary">
                                    <Image src={smileyIcon} alt="Smiley Face" height={25} width={25} />
                                    <Text fontWeight="bold">67%</Text>
                                </div>
                                <Text>Of the <b>123 reviews</b> who responded, 83 would recommend this product.</Text>
                            </div>
                        </div>

                        <div className="filter">
                            <Switch.Root className="verified" size="lg">
                                <Switch.HiddenInput />
                                <Switch.Label>Verified Buyers Only</Switch.Label>
                                <Switch.Control colorPalette="orange" />
                            </Switch.Root>

                            <Select.Root collection={sortTypes.current} className="sort">
                                <Select.HiddenSelect />
                                <Select.Label>Sort</Select.Label>
                                <Select.Control>
                                    <Select.Trigger>
                                    <Select.ValueText placeholder="Select framework" />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                    <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Portal>
                                    <Select.Positioner>
                                    <Select.Content>
                                        {sortTypes.current.items.map((type, ) => (
                                        <Select.Item item={type} key={"sorttype-" + type.value}>
                                            {type.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                        ))}
                                    </Select.Content>
                                    </Select.Positioner>
                                </Portal>
                            </Select.Root>
                        </div>

                        <div className="review-list">
                            <ol>
                                {reviews.current.map((review, index) => (
                                    <li key={"review-index-" + index}>
                                        <Review {...review} />
                                    </li>
                                ))}
                            </ol>

                            <ButtonGroup colorPalette="orange" size="lg" className="review-actions">
                                <Button variant="solid" className="load-more">Explore all Reviews</Button>
                                <Button variant="outline" className="write-btn">Write Your Review</Button>
                            </ButtonGroup>
                        </div>

                    </Accordion.ItemBody>
                </Accordion.ItemContent>
            </Accordion.Item>
        </Accordion.Root>

        </section>
    );
}