
import { ChangeEvent, Dispatch, memo, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { Field, Heading, Input, NativeSelect } from "@chakra-ui/react";
import { withMask } from "use-mask-input";
import { AddressType } from "@/lib/slices/account";
import style from "./payment-methods.module.scss";

interface AddAddressFormType {
    setCardAddress: Dispatch<SetStateAction<AddressType | undefined>>;
}

export default memo(function AddAddressForm({ setCardAddress }: AddAddressFormType) {

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

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [postalCode, setPostalCode] = useState("")

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

    useEffect(() => {
        setCardAddress({
            firstName,
            lastName,
            phoneNumber,
            address,
            city,
            province,
            postalCode,
            isDefault: false,
        });
    }, [firstName, lastName, phoneNumber, address, city, province, postalCode]);

    return (
        <div className={style['address-form']}>
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
            </div>
        </div>
    );
})

