"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useAppSelector } from "@/lib/hooks";
import style from "./addresses-desktop.module.scss";
import AddressItem from "@/components/account/addresses/desktop/address-item";
import AddAddressForm from "@/components/account/addresses/desktop/add-address-form";
import addIcon from "@/public/plus.svg";


export default function AddressesDesktop() {
    
    const addressList = useAppSelector(state => state.accountSlice.addressList);
    const [addAddress, setAddAddress] = useState(false);
    const [editAddress, setEditAddress] = useState("");

    const handleNewAddress = useCallback(() => {
        setAddAddress(true);
    }, []);

    return (
        <main className={style.page}>
            <Heading as="h1">Addresses</Heading>
            <Text fontSize="sm" textAlign="center">Add your preferred addresses and choose a favorite.</Text>
            
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

                    <Button colorPalette="orange" variant="ghost" className="add-address" onClick={handleNewAddress}>
                        <Image src={addIcon} alt="Plus Icon" height={17} />
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