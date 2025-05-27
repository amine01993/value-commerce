
import Image from "next/image";
import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AddressType, removeAddress } from "@/lib/slices/account"
import deleteIcon from "@/public/delete.svg";
import editIcon from "@/public/edit.svg";

interface AddressItemType {
    address: AddressType;
    setEditAddress: Dispatch<SetStateAction<string>>;
    setAddAddress: Dispatch<SetStateAction<boolean>>;
}

export default memo(function AddressItem({address, setAddAddress, setEditAddress}: AddressItemType) {

    const dispatch = useAppDispatch();
    const addressList = useAppSelector(state => state.accountSlice.addressList)

    const header = useMemo(() => {
        return address.firstName + ' ' + address.lastName.substring(0, 1) + " - " + address.address;
    }, []);

    const handleAddressDeletion = useCallback(() => {
        dispatch(removeAddress(address.id));
    }, [addressList]);

    const handleAddressEdition = useCallback(() => {
        setAddAddress(true);
        setEditAddress(address.id);
    }, [address]);

    return (
        <div className="address">
            <Heading as="h3" fontSize="md">
                {header}
                {address.isDefault && (
                    <Text as="span" fontSize="sm">Default</Text>
                )}
            </Heading>

            <Text className="content" fontSize="sm">
                {address.firstName} {address.lastName}<br />
                {address.address}<br />
                {address.city}, {address.province}, {address.postalCode}<br />
                {address.phoneNumber}
            </Text>

            <div className="actions">
                <Button colorPalette="orange" fontSize="md" size="lg" variant="plain" onClick={handleAddressDeletion}>
                    <Image src={deleteIcon} alt="Delete Address" height={20} />
                    Remove
                </Button>

                <Button colorPalette="orange" fontSize="md" size="lg" variant="plain" onClick={handleAddressEdition}>
                    <Image src={editIcon} alt="Edit Address" height={20} />
                    Edit
                </Button>
            </div>
        </div>
    )
})