
import { ChangeEvent, Dispatch, FormEvent, memo, SetStateAction, useCallback, useMemo, useRef, useState } from "react";
import { Button, Checkbox, CheckboxCheckedChangeDetails, Field, Heading, Input, NativeSelect, Separator } from "@chakra-ui/react";
import { withMask } from "use-mask-input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { randomString } from "@/utils/common";
import { saveAddress as saveAddr } from "@/lib/slices/account";
import style from "./style.module.scss";

interface AddAddressFormType {
    editAddress: string;
    setEditAddress: Dispatch<SetStateAction<string>>;
    setAddAddress: Dispatch<SetStateAction<boolean>>;
}

export default memo(function AddAddressForm({ editAddress: addrId, setAddAddress, setEditAddress }: AddAddressFormType) {

    const dispatch = useAppDispatch();
    const addressList = useAppSelector(state => state.accountSlice.addressList)
    const addr = useMemo(() => {
        const tmp = addressList.find(a => a.id === addrId);
        return tmp;
    }, [addrId, addressList]);

    const phoneMask = useRef(withMask("(999) 999-9999"));
    const provinceList = useRef([
        {label: "Alberta", value: "AB"},
        {label: "British Columbia", value: "BC"},
        {label: "Manitoba", value: "MB"},
        {label: "New Brunswick", value: "NB"},
        {label: "Newfoundland and Labrador", value: "NL"},
        {label: "Nova Scotia", value: "NS"},
        {label: "Northwest Territories", value: "NT"},
        {label: "Nunavut", value: "NU"},
        {label: "Ontario", value: "ON"},
        {label: "Prince Edward Island", value: "PE"},
        {label: "Quebec", value: "QC"},
        {label: "Saskatchewan", value: "SK"},
        {label: "Yukon", value: "YT"},
    ]);

    const [firstName, setFirstName] = useState(addr?.firstName ?? "")
    const [lastName, setLastName] = useState(addr?.lastName ?? "")
    const [phoneNumber, setPhoneNumber] = useState(addr?.phoneNumber ?? "")
    const [address, setAddress] = useState(addr?.address ?? "")
    const [city, setCity] = useState(addr?.city ?? "")
    const [province, setProvince] = useState(addr?.province ?? "")
    const [postalCode, setPostalCode] = useState(addr?.postalCode ?? "")
    const [isDefault, setIsDefault] = useState(addr?.isDefault ?? false)

    const handleFirstNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }, []);

    const handleLastNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }, []);

    const handlePhoneChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    }, []);

    const handleAddressChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    }, []);

    const handleCityChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    }, []);

    const handleProvinceChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setProvince(event.target.value);
    }, []);

    const handlePostalCodeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPostalCode(event.target.value);
    }, []);

    const handleDefaultChange = useCallback((details: CheckboxCheckedChangeDetails) => {
        setIsDefault(Boolean(details.checked));
    }, []);

    const saveAddress = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // validation
        // post request
        
        const id = !addrId ? randomString(10) : addrId;
        dispatch(saveAddr({
            id,
            firstName,
            lastName,
            phoneNumber,
            address,
            city,
            province,
            postalCode,
            isDefault,
        }))

        setAddAddress(false);
        setEditAddress("")
        
    }, [firstName, lastName, phoneNumber, address, city, province, postalCode, isDefault, addressList]);

    const cancelForm = useCallback(() => {
        setAddAddress(false);
        setEditAddress("")
    }, []);

    return (
        <form className={style['address-form']} onSubmit={saveAddress}>
            <Heading as="h2" fontSize="md" className="title">Add a new address</Heading>

            <div className="fields">
                <Field.Root required>
                    <Field.Label fontSize="md">First Name <Field.RequiredIndicator /></Field.Label>
                    <Input size="lg" value={firstName} onChange={handleFirstNameChange} />
                </Field.Root>

                <Field.Root required>
                    <Field.Label fontSize="md">Last Name <Field.RequiredIndicator /></Field.Label>
                    <Input size="lg" value={lastName} onChange={handleLastNameChange} />
                </Field.Root>

                <Field.Root required>
                    <Field.Label fontSize="md">Phone Number <Field.RequiredIndicator /></Field.Label>
                    <Input size="lg" placeholder="(999) 999-9999" ref={phoneMask.current} value={phoneNumber} onChange={handlePhoneChange} />
                    <Field.HelperText>We’ll only call you if there’s an issue with the order</Field.HelperText>
                </Field.Root>

                <Field.Root required>
                    <Field.Label fontSize="md">Address <Field.RequiredIndicator /></Field.Label>
                    <Input size="lg" value={address} onChange={handleAddressChange} />
                </Field.Root>

                <Field.Root required>
                    <Field.Label fontSize="md">City <Field.RequiredIndicator /></Field.Label>
                    <Input size="lg" value={city} onChange={handleCityChange} />
                </Field.Root>

                <div className="province">
                    <Field.Root required>
                        <Field.Label fontSize="md">Province <Field.RequiredIndicator /></Field.Label>
                        <NativeSelect.Root size="lg">
                            <NativeSelect.Field placeholder="- Select -" value={province} onChange={handleProvinceChange}>
                                {provinceList.current.map(p => (
                                <option value={p.value} key={'province-' + p.value}>{p.label}</option>
                                ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label fontSize="md">Postal Code <Field.RequiredIndicator /></Field.Label>
                        <Input size="lg" value={postalCode} onChange={handlePostalCodeChange} />
                    </Field.Root>
                </div>

                <Field.Root disabled>
                    <Field.Label fontSize="md">Country</Field.Label>
                    <NativeSelect.Root disabled size="lg">
                        <NativeSelect.Field>
                            <option value="CA">Canada</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Field.Root>

                <Separator />
                <Checkbox.Root colorPalette="orange" checked={isDefault} onCheckedChange={handleDefaultChange}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label fontSize="md">Set as default shipping address</Checkbox.Label>
                </Checkbox.Root>
                <Separator />
            </div>

            <div className="actions">
                <Button colorPalette="orange" fontSize="md" fontWeight="semibold" size="lg" type="submit">Save</Button>
                <Button colorPalette="orange" variant="plain" fontSize="md" fontWeight="semibold" size="lg" onClick={cancelForm}>Cancel</Button>
            </div>
        </form>
    );
})

