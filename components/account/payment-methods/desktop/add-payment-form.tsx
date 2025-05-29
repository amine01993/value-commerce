
import Image from "next/image";
import { ChangeEvent, Dispatch, FormEvent, memo, SetStateAction, useCallback, useRef, useState } from "react";
import { Button, Checkbox, CheckboxCheckedChangeDetails, Field, Heading, Input, InputGroup, Separator, Text } from "@chakra-ui/react";
import { usePaymentInputs } from "react-payment-inputs";
import cardImages, { type CardImages } from "react-payment-inputs/images";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { randomString } from "@/utils/common";
import { addCard, AddressType, saveAddress } from "@/lib/slices/account";
import AddAddressForm from "./add-address-form";
import AddressItem from "./address-item";
import style from "./style.module.scss";
import mastercardIcon from "@/public/logo_mastercard.svg";
import visaIcon from "@/public/logo_visa.svg";
import paymentIcon from "@/public/payment.svg";
import addIcon from "@/public/plus.svg";

interface AddPaymentFormType {
    setAddPayment: Dispatch<SetStateAction<boolean>>;
}

export default memo(function AddPaymentForm({ setAddPayment }: AddPaymentFormType) {

    const dispatch = useAppDispatch();
    const cardList = useAppSelector(state => state.accountSlice.cardList);
    const addressList = useAppSelector(state => state.accountSlice.addressList);
    const images = useRef(cardImages as unknown as CardImages);
    const { meta, wrapperProps, getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps } = usePaymentInputs();
    
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const [cardAddress, setCardAddress] = useState<AddressType>();
    const [addAddress, setAddAddress] = useState(false);

    const handleCardChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCardNumber(event.target.value);
    }, []);

    const handleExpiryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setExpiry(event.target.value);
    }, []);

    const handleCvcChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCvc(event.target.value);
    }, []);

    const handleDefaultChange = useCallback((details: CheckboxCheckedChangeDetails) => {
        setIsDefault(Boolean(details.checked));
    }, []);

    const handleNewAddress = useCallback(() => {
        setAddAddress(true);
    }, []);

    const saveCard = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // validation
        // post request
        
        if(cardAddress) {
            if(!cardAddress.id) {
                cardAddress.id = randomString(10);
                dispatch(saveAddress(cardAddress));
            }

            const number = cardNumber.slice(0, cardNumber.length - 4).replace(/[0-9]/g, "*") + cardNumber.slice(cardNumber.length - 4);
            dispatch(addCard({
                id: randomString(10),
                number,
                expiry,
                type: meta.cardType.type,
                isDefault,
                address: cardAddress!,
            }));
        }

        setAddPayment(false);
    }, [cardNumber, expiry, cvc, isDefault, cardAddress, cardList]);

    const cancelForm = useCallback(() => {
        setAddPayment(false);
    }, []);

    return (
        <form className="payment-form" onSubmit={saveCard}>
            <Heading as="h2" fontSize="sm" className="title">Add a new credit card</Heading>
            
            <Text fontSize="sm">We accept the following:</Text>
            <div className="payment-methods">
                <span><Image src={mastercardIcon} alt="Master Card" height={20} /></span>
                <span><Image src={visaIcon} alt="Visa Card" height={20} /></span>
            </div>

            <div className="payment-fields">
                <Field.Root>
                    <Field.Label>Card Number</Field.Label>
                    <InputGroup {...wrapperProps} endElement={(
                        <>
                            {meta.cardType && (
                                <svg {...getCardImageProps({ images: images.current })} />
                            )}
                            {!meta.cardType && (
                                <Image src={paymentIcon} alt="Account Payment Methods" width={17} />
                            )}
                        </>
                    )}>
                        <Input {...getCardNumberProps({ onChange: handleCardChange })} />
                    </InputGroup>
                </Field.Root>

                <div className="expiry">
                    <Field.Root>
                        <Field.Label>Expiry</Field.Label>
                        <Input {...getExpiryDateProps({ onChange: handleExpiryChange })} />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>CVC</Field.Label>
                        <Input {...getCVCProps({ onChange: handleCvcChange })} />
                    </Field.Root>
                </div>
            </div>

            <Separator />

            {addressList.length > 0 && (
                <>
                    <Heading as="h3" fontSize="sm" className="title">Choose a billing address</Heading>

                    {addressList.map(addr => (
                        <AddressItem 
                            key={"select-" + addr.id} 
                            address={addr} 
                            selected={cardAddress && cardAddress?.id === addr.id || !cardAddress && addr.isDefault}
                            setCardAddress={setCardAddress}
                            setAddAddress={setAddAddress}
                        />  
                    ))}

                    {!addAddress && (
                        <Button colorPalette="orange" variant="ghost" className={style["add-address"]} onClick={handleNewAddress}>
                            <Image src={addIcon} alt="Plus Icon" height={17} />
                        Add a new address
                        </Button>
                    )}
                </>
            )}
            {(addAddress || addressList.length === 0) && (
                <AddAddressForm setCardAddress={setCardAddress} />
            )}

            <Separator />

            <Checkbox.Root colorPalette="orange" checked={isDefault} onCheckedChange={handleDefaultChange}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>Set as default credit card</Checkbox.Label>
            </Checkbox.Root>
            <Separator />

            <div className="actions">
                <Button colorPalette="orange" fontWeight="semibold" type="submit">Save</Button>
                <Button colorPalette="orange" variant="ghost" fontWeight="semibold" onClick={cancelForm}>Cancel</Button>
            </div>
        </form>
    );
});

