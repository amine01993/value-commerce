
import Image from "next/image";
import { memo, useCallback, useMemo } from "react";
import { Button, Separator, Tag, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CardType, removeCard } from "@/lib/slices/account";
import AddressItem from "./address-item";
import mastercardIcon from "@/public/logo_mastercard.svg";
import visaIcon from "@/public/logo_visa.svg";
import deleteIcon from "@/public/delete.svg";

interface CardItemType {
    card: CardType;
}

export default memo(function CardItem({card}: CardItemType) {

    const dispatch = useAppDispatch();
    const cardList = useAppSelector(state => state.accountSlice.cardList);

    const expiry = useMemo(() => {
        return card.expiry.replace(/\s/g, "");
    }, [card.expiry]);

    const handleCardDeletion = useCallback(() => {
        dispatch(removeCard(card.id));
    }, [cardList]);

    return (
        <div className="card">
            <div className="title">
                {card.type === "visa" && (
                    <Image src={visaIcon} alt="Visa Card" height={20} />
                )}
                {card.type === "mastercard" && (
                    <Image src={mastercardIcon} alt="Master Card" height={20} />
                )}
                {card.isDefault && (
                    <Tag.Root size="sm" colorPalette="orange">
                        <Tag.Label>Default</Tag.Label>
                    </Tag.Root>
                )}
            </div>
            <Text className="info" fontSize="sm">{card.number}</Text>
            <Text className="info" fontSize="sm">Expires on {expiry}</Text>

            <Separator />

            <Text fontSize="sm" fontWeight="semibold">Billing Address</Text>

            <AddressItem address={card.address} />

            <div className="actions">
                <Button colorPalette="orange" variant="ghost" onClick={handleCardDeletion}>
                    <Image src={deleteIcon} alt="Delete Address" height={17} />
                    Remove
                </Button>
            </div>
        </div>
    );
});