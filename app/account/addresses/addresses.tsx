"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useAppSelector } from "@/lib/hooks";
import style from "./addresses.module.scss";
import AddressItem from "@/components/account/addresses/address-item";
import AddAddressForm from "@/components/account/addresses/add-address-form";
import addIcon from "@/public/plus.svg";

export default function Addresses() {

    const addressList = useAppSelector(state => state.accountSlice.addressList)
    const [addAddress, setAddAddress] = useState(false);
    const [editAddress, setEditAddress] = useState("");

    const handleNewAddress = useCallback(() => {
        setAddAddress(true)
    }, []);

    return (
        <main className={style.page}>
            <Heading as="h1">Addresses</Heading>
            <Text>Add your preferred addresses and choose a favorite.</Text>
            
            {!addAddress && (
                <>
                {addressList.length === 0 && (
                    <Heading as="h2" fontSize="md" className="subtitle">You have no saved shipping addresses.</Heading>
                )}
                {addressList.length > 0 && (
                    <Heading as="h2" fontSize="md" className="subtitle">You have {addressList.length} saved shipping address.</Heading>
                )}

                {addressList.length > 0 && addressList.map(addr => (
                    <AddressItem key={addr.id} address={addr} setAddAddress={setAddAddress} setEditAddress={setEditAddress} />
                ))}

                <Button colorPalette="orange" variant="plain" className="add-address" fontSize="md" onClick={handleNewAddress}>
                    <Image src={addIcon} alt="Plus Icon" height={20} />
                    Add a new address
                </Button>
                </>
            )}

            {addAddress && (
                <AddAddressForm editAddress={editAddress} setAddAddress={setAddAddress} setEditAddress={setEditAddress} />
            )}
        </main>
    );
}

