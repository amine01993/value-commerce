"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Heading, Separator, RatingGroup, RatingGroupValueChangeDetails, Text, Field, Input, Textarea, Fieldset, RadioGroup, Button, Accordion, Link as LinkUI, RadioGroupValueChangeDetails } from "@chakra-ui/react";
import style from "./create-review-desktop.module.scss";
import { ProductReview } from "./create-review";
import productImg from "@/public/products/laptop-hp.png";

interface CreateReviewParams {
    varid: string;
}

export default function CreateReviewDesktop({varid}: CreateReviewParams) {

    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [nickname, setNickname] = useState("");
    const [recommendation, setRecommendation] = useState<string|null>(null);

    const handleRatingChange = useCallback((details: RatingGroupValueChangeDetails) => {
        setRating(details.value);
    }, []);

    const handleTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }, []);

    const handleDescriptionChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }, []);

    const handleNicknameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    }, []);

    const handleRecommendationChange = useCallback((details: RadioGroupValueChangeDetails) => {
        setRecommendation(details.value);
    }, []);

    const saveReview = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const review: ProductReview = {
            rating,
            title,
            description,
            nickname,
            recommendation: recommendation ? parseInt(recommendation) : undefined,
        };
        console.log("saveReview", review);
    }, [rating, title, description, nickname, recommendation]);

    return (
        <main className={style.page}>
            <section>
                <Heading as="h1">Write Your Review</Heading>
                <div className="product">
                    <Image src={productImg} alt="Lenovo IdeaPad 1i14” Laptop - Abyss Blue (Intel Celeron N4500/4GB RAM/128GB)" width={300} />
                    <Heading as="h2" fontSize="md">Lenovo IdeaPad 1i14” Laptop - Abyss Blue (Intel Celeron N4500/4GB RAM/128GB)</Heading>
                </div>

                <Separator bgColor="gray.300" />

                <div className="wrapper">
                    <form onSubmit={saveReview}>
                        <div className="rating">
                            <Heading as="h3" fontSize="md">Overall Rating</Heading>
                            <RatingGroup.Root count={5} size="lg" allowHalf colorPalette="yellow" value={rating} onValueChange={handleRatingChange}>
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                            </RatingGroup.Root>
                        </div>

                        <div className="detail">
                            <Heading as="h3" fontSize="md">Review Details</Heading>
                            <Text fontSize="sm">Let us know how this product is working for you.</Text>

                            <div className="fields">
                                <Field.Root>
                                    <Field.Label>Title</Field.Label>
                                    <Input value={title} onChange={handleTitleChange} />
                                    <Field.HelperText>Write a short, descriptive title for your review.</Field.HelperText>
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Your Review</Field.Label>
                                    <Textarea rows={10} value={description} onChange={handleDescriptionChange} />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Nickname</Field.Label>
                                    <Input value={nickname} onChange={handleNicknameChange} />
                                    <Field.HelperText>This will show up on your review.</Field.HelperText>
                                </Field.Root>

                                <Fieldset.Root>
                                    <Fieldset.Legend fontWeight="semibold">
                                        Would you recommend this to a friend?
                                    </Fieldset.Legend>
                                    <RadioGroup.Root name="recommendation" colorPalette="orange" className="recommendation"
                                        value={recommendation} onValueChange={handleRecommendationChange}>
                                        <RadioGroup.Item value="1">
                                            <RadioGroup.ItemHiddenInput />
                                            <RadioGroup.ItemIndicator />
                                            <RadioGroup.ItemText>Yes</RadioGroup.ItemText>
                                        </RadioGroup.Item>
                                        <RadioGroup.Item value="0">
                                            <RadioGroup.ItemHiddenInput />
                                            <RadioGroup.ItemIndicator />
                                            <RadioGroup.ItemText>No</RadioGroup.ItemText>
                                        </RadioGroup.Item>
                                    </RadioGroup.Root>
                                </Fieldset.Root>
                            </div>

                            <Button colorPalette="orange" type="submit">
                                Submit Review
                            </Button>
                        </div>

                    </form>

                    <div className="guidelines">
                        <Heading as="h3" fontSize="md">See review guidelines</Heading>

                        <Heading as="h4" fontSize="md">Do</Heading>
                        <ul>
                            <li>Describe your experience using the product</li>
                            <li>Share details about what you like or dislike</li>
                        </ul>
                        <Heading as="h4" fontSize="md">Don’t</Heading>
                        <ul>
                            <li>Share personal information such as email address, phone number or order number</li>
                            <li>Share prices, whether from Best Buy or our competitors</li>
                            <li>Use inappropriate language, discriminatory language, or other language not suitable for a public forum</li>
                        </ul>
                    </div>
                </div>

            </section>
        </main>
    );
}