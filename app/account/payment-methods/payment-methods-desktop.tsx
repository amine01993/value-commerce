"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useAppSelector } from "@/lib/hooks";
import style from "./payment-methods-desktop.module.scss";
import CardItem from "@/components/account/payment-methods/desktop/card-item";
import AddPaymentForm from "@/components/account/payment-methods/desktop/add-payment-form";
import addIcon from "@/public/plus.svg";


export default function PaymentMethodsDesktop() {

    const cardList = useAppSelector(state => state.accountSlice.cardList);
    const [addPayment, setAddPayment] = useState(false);

    const handleNewPayment = useCallback(() => {
        setAddPayment(true);
    }, []);

    return (
        <main className={style.page}>
            <Heading as="h1">Payment Methods</Heading>
            <Text fontSize="sm" textAlign="center">Save and manage your payment details for a fast checkout.</Text>
            
            {cardList.length === 0 && (
                <Heading as="h2" fontSize="sm" className="subtitle">You have no saved credit cards.</Heading>
            )}
            {cardList.length > 0 && (
                <Heading as="h2" fontSize="sm" className="subtitle">You have {cardList.length} saved credit card.</Heading>
            )}

            {!addPayment && (
                <>
                    {cardList.length > 0 && cardList.map(card => (
                        <CardItem key={card.id} card={card} />
                    ))}

                    <Button colorPalette="orange" variant="ghost" className="add-payment-method" onClick={handleNewPayment}>
                        <Image src={addIcon} alt="Plus Icon" height={17} />
                    Add a new credit card
                    </Button>
                </>
            )}

            {addPayment && (
                <AddPaymentForm setAddPayment={setAddPayment} />
            )}
        </main>
    );
}