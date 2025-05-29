
import Image from "next/image";
import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";
import { Heading, Text } from "@chakra-ui/react";
import { AddressType } from "@/lib/slices/account";
import style from "./style.module.scss";
import checkmarkIcon from "@/public/checkmark.svg";

interface AddressItemType {
    address: AddressType;
    selected?: boolean;
    setCardAddress?: Dispatch<SetStateAction<AddressType | undefined>>;
    setAddAddress?: Dispatch<SetStateAction<boolean>>
}

export default memo(function AddressItem({address, selected, setCardAddress, setAddAddress}: AddressItemType) {

    const header = useMemo(() => {
        return address.firstName + " " + address.lastName.substring(0, 1) + " - " + address.address;
    }, []);

    const handleAddressChange = useCallback(() => {
        if(setCardAddress && setAddAddress) {
            setCardAddress(address);
            setAddAddress(false);
        }
    }, [address]);

    return (
        <div className={style.address + " " + (selected !== undefined ? style.selectable : undefined) + " " + (selected ? style.selected : undefined)} 
            onClick={handleAddressChange}>
            <Heading as="h3" fontSize="md">
                {header}
                {address.isDefault && (
                    <Text fontSize="sm">Default</Text>
                )}
            </Heading>

            <Text className="content" fontSize="sm">
                {address.firstName} {address.lastName}<br />
                {address.address}<br />
                {address.city}, {address.province}, {address.postalCode}<br />
                {address.phoneNumber}
            </Text>

            {selected && (
                <Image className="checked" src={checkmarkIcon} alt="Selected Address" height={17} />
            )}
        </div>
    );
});