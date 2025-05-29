"use client";

import { useRef } from "react";
import { Heading, Tabs, Text } from "@chakra-ui/react";
import style from "./dashboard-desktop.module.scss";
import PurchasedItem from "@/components/account/dashboard/desktop/purchased-item";
import p1 from "@/public/products/swim-cap.webp";
import p2 from "@/public/products/swimming-goggles-1.webp";
import p3 from "@/public/products/swimming-goggles-2.webp";
import p4 from "@/public/products/laptop-hp.png";


export default function DashboardDesktop() {

    const purchasesData = useRef([
        {
            items: [
                {
                    src: p1,
                    name: "Anti-Slip Swimming Cap Waterproof Swim Pool Hat For Unisex Adult Men Women US",
                    price: "$12.91",
                },
                {
                    src: p2,
                    name: "Myopia Swimming Goggles Diving Goggles Leakproof Anti-fog Prescription Glasses",
                    price: "$11.91",
                },
                {
                    src: p3,
                    name: "Adult Swimming Goggles Adjustable Anti-Fog Glasses Diving Underwater Protection",
                    price: "$10.50",
                },
            ],
            orderDate: "Apr 30, 2025",
            totalPrice: "$35.32",
            paymentType: "Visa ****9130",
            deliveryDate: null,
        },
        {
            items: [
                {
                    src: p4,
                    name: "HP 17.3\" FHD IPS Laptop i5-1335U 12GB RAM 512GB SSD W11H",
                    price: "$534.46",
                }
            ],
            orderDate: "Jan 07, 2024",
            totalPrice: "$534.46",
            paymentType: "Paypal",
            deliveryDate: "Feb 29, 2025",
        },
    ]);

    return (
        <main className={style.page}>
            <Heading as="h1">Purchase history</Heading>
            
            <Tabs.Root defaultValue="purchases" variant="line">
                <Tabs.List>
                    <Tabs.Trigger value="purchases">
                        Purchases
                    </Tabs.Trigger>
                    <Tabs.Trigger value="refunds">
                        Refunds
                    </Tabs.Trigger>
                    <Tabs.Indicator />
                </Tabs.List>
                <Tabs.Content value="purchases">
                    <div className="purchases">
                        {purchasesData.current.length > 0 && (
                            <>
                                <div className="purchase-header"></div>
                                <div className="purchase-header">
                                    <Text fontWeight="semibold">Order date</Text>
                                </div>
                                <div className="purchase-header">
                                    <Text fontWeight="semibold">Total price</Text>
                                </div>
                                <div className="purchase-header">
                                    <Text fontWeight="semibold">Payment type</Text>
                                </div>
                                <div className="purchase-header"></div>
                                <div className="purchase-info"></div>
                            </>
                        )}
                        {purchasesData.current.length > 0 && purchasesData.current.map((purchase, index) => (
                            <PurchasedItem key={`d-${purchase.orderDate}-i-${index}`} purchase={purchase} />
                        ))}
                    </div>

                    {purchasesData.current.length === 0 && (
                        <Text fontWeight="semibold" fontSize="lg" className="no-items">Nothing to show yet!</Text>
                    )}
                </Tabs.Content>
                <Tabs.Content value="refunds">
                    <Text fontWeight="semibold" fontSize="lg" className="no-items">Nothing to show yet!</Text>
                </Tabs.Content>
            </Tabs.Root>
        </main>
    );
}