
import Image from "next/image";
import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AddressType, removeAddress } from "@/lib/slices/account"
import style from "./style.module.scss";
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
        if(address.id) {
            dispatch(removeAddress(address.id));
        }
    }, [addressList]);

    const handleAddressEdition = useCallback(() => {
        setAddAddress(true);
        if(address.id) {
            setEditAddress(address.id);
        }
    }, [address]);

    return (
        <div className={style.address}>
            <Heading as="h3" fontSize="sm">
                {header}
                {address.isDefault && (
                    <Text as="span" fontSize="xs">Default</Text>
                )}
            </Heading>

            <Text className="content" fontSize="sm">
                {address.firstName} {address.lastName}<br />
                {address.address}<br />
                {address.city}, {address.province}, {address.postalCode}<br />
                {address.phoneNumber}
            </Text>

            <div className="actions">
                <Button colorPalette="orange" variant="ghost" onClick={handleAddressDeletion}>
                    <Image src={deleteIcon} alt="Delete Address" height={17} />
                    Remove
                </Button>

                <Button colorPalette="orange" variant="ghost" onClick={handleAddressEdition}>
                    <Image src={editIcon} alt="Edit Address" height={17} />
                    Edit
                </Button>
            </div>
        </div>
    )
})