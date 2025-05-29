"use client";

import Image from "next/image";
import { useRef } from "react";
import { Avatar, Button, createListCollection, Input, Link as LinkUI, Portal, Select, Separator, Span, Stack, Text } from "@chakra-ui/react";
import style from "./style.module.scss";
import infoIcon from "@/public/round-info.svg";
import mastercardIcon from "@/public/logo_mastercard.svg";
import visaIcon from "@/public/logo_visa.svg";
import paypalIcon from "@/public/logo_paypal.svg";

export default function ProductDetail() {
    
    const variations = useRef(createListCollection({
        items: [
            {
                label: "1 Pack",
                value: "1",
                description: "Most Popular",
            },
            {
                label: "2 Pack",
                value: "2",
            },
            {
                label: "10 Pack",
                value: "10",
            },
            {
                label: "50 Pack",
                value: "50",
            },
        ],
    }));

    return (
        <div className={style.detail}>
            <div className="seller">
                <Avatar.Root variant="solid" size="xl">
                    <Avatar.Fallback name="John Doe" />
                </Avatar.Root>
                <div className="info">
                    <Text fontWeight="semibold">warm store33 <span className="count">(123)</span></Text>
                    <LinkUI variant="underline" href="#">50% positive</LinkUI>
                </div>
            </div>

            <Separator bgColor="gray.300" />

            <div className="price">
                <Text fontWeight="semibold" textStyle="2xl">$33.49</Text>
                <div className="price-detail">
                    <Text color="gray.600">Was <span className="old-price">$50.99</span></Text>
                    <Text color="red.600">(20% off)</Text>
                    <Image src={infoIcon} alt="Information Icon" height={16} width={16} />
                    <LinkUI color="gray.600" variant="underline" href="#">Price Details</LinkUI>
                </div>
            </div>

            <Separator bgColor="gray.300" />

            <div className="detail">
                <div className="condition">
                    <Text>Condition: <span className="condition-type">Brand new</span></Text>
                    <Image src={infoIcon} alt="Information Icon" height={16} width={16} />
                </div>

                <Select.Root collection={variations.current} defaultValue={["1"]}>
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select plan" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {variations.current.items.map((option) => (
                                    <Select.Item item={option} key={option.value}>
                                        <Stack gap="0">
                                            <Select.ItemText>{option.label}</Select.ItemText>
                                            {option.description && (
                                                <Span color="fg.muted">
                                                    {option.description}
                                                </Span>
                                            )}
                                        </Stack>
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>

                <div className="quantity">
                    <label htmlFor="product-qty">Quantity:</label>
                    <Input placeholder="Quantity" id="product-qty" defaultValue={1}/>
                    <Text className="nbr">10 available</Text>
                </div>
            </div>

            <Stack className="btn-group">
                <Button colorPalette="orange" rounded="2xl" size="lg">Buy It Now</Button>
                <Button colorPalette="orange" variant="outline" rounded="2xl" size="lg">Add to Cart</Button>
            </Stack>

            <div className="other">
                <Text>Shipping:</Text>
                <Text>Free International Shipping</Text>

                <Text>Delivery:</Text>
                <Text>Estimated between <b>Tue, Jun 3</b> and <b>Thu, Jun 26</b></Text>

                <Text>Returns:</Text>
                <Text>30 days returns</Text>
                <Text>Payments:</Text>
                
                <div className="payment-methods">
                    <span><Image src={mastercardIcon} alt="Master Card" height={25} width={39} /></span>
                    <span><Image src={visaIcon} alt="Visa Card" height={25} width={63} /></span>
                    <span><Image src={paypalIcon} alt="Paypal" height={25} width={22} /></span>
                </div>
            </div>

        </div>
    );
}