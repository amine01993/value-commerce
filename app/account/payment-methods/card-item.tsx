
import Image from "next/image";
import { memo, useCallback, useMemo } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CardType, removeCard } from "@/lib/slices/account"
import mastercardIcon from "@/public/logo_mastercard.svg";
import visaIcon from "@/public/logo_visa.svg";
import deleteIcon from "@/public/delete.svg";

interface CardItemType {
    card: CardType;
}

export default memo(function CardItem({card}: CardItemType) {

    const dispatch = useAppDispatch();
    const cardList = useAppSelector(state => state.accountSlice.cardList)

    const expiry = useMemo(() => {
        return card.expiry.replace(/\s/g, "");
    }, [card.expiry])

    const handleCardDeletion = useCallback(() => {
        dispatch(removeCard(card.id));
    }, [cardList]);

    return (
        <div className="card">
            {card.type === "visa" && (
                <Image src={visaIcon} alt="Visa Card" height={25} width={63} />
            )}
            {card.type === "mastercard" && (
                <Image src={mastercardIcon} alt="Master Card" height={25} width={39} />
            )}
            <Text>{card.number}</Text>
            <Text>Expires on {expiry}</Text>

            <Button colorPalette="orange" fontSize="md" size="lg" variant="plain" onClick={handleCardDeletion}>
                <Image src={deleteIcon} alt="Delete Card" height={20} />
                Remove
            </Button>
        </div>
    )
})