"use client";

import { useCallback, useMemo, useState } from "react";
import { Button, Heading, RadioGroup, RadioGroupValueChangeDetails, Separator, Text } from "@chakra-ui/react";
import { useAppSelector } from "@/lib/hooks";
import style from "./personal-detail.module.scss";
import NameForm from "./name-form";
import PhoneForm from "./phone-form";
import EmailForm from "./email-form";
import PasswordForm from "./password-form";

export default function PersonalDetail() {

    const firstName = useAppSelector(state => state.userSlice.firstName);
    const lastName = useAppSelector(state => state.userSlice.lastName);
    const phone = useAppSelector(state => state.userSlice.phone);
    const email = useAppSelector(state => state.userSlice.email);
    const passwordLastUpdate = useAppSelector(state => state.userSlice.passwordLastUpdate);

    const [editName, setEditName] = useState(false);
    const [editPhone, setEditPhone] = useState(false);    
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const [preference, setPreference] = useState<string>("password");

    const editing = useMemo(() => {
        return editName || editPhone || editEmail || editPassword;
    }, [editName, editPhone, editEmail, editPassword]);

    const fullName = useMemo(() => {
        return firstName + " " + lastName
    }, [firstName, lastName]);

    const passwordText = useMemo(() => {
        const formatter = new Intl.DateTimeFormat("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const tokens = passwordLastUpdate.split("-");
        const date = new Date(+tokens[2], +tokens[0] - 1, +tokens[1]);
        return `(First created on ${formatter.format(date)})`
    }, [passwordLastUpdate]);

    const handlePreferenceUpdate = useCallback((details: RadioGroupValueChangeDetails) => {
        setPreference(details.value!);
    }, []);

    const startEditName = useCallback(() => {
        setEditName(true);
    }, []);

    const startEditPhone = useCallback(() => {
        setEditPhone(true);
    }, []);

    const startEditEmail = useCallback(() => {
        setEditEmail(true);
    }, []);

    const startEditPassword = useCallback(() => {
        setEditPassword(true);
    }, []);
    

    return (
        <main className={style.page}>
            <Heading as="h1">Personal Detail</Heading>
            <Text>Update your name, phone number, email,  password, and sign in preference at any time.</Text>
            
            <div className="personal-detail">
                {!editing && (
                    <>
                    <div className="edit">
                        <Text as="label" fontWeight="semibold">Name</Text>
                        <Text>{fullName}</Text>
                        <Button variant="plain" fontSize="md" fontWeight="semibold" onClick={startEditName}>Edit</Button>
                    </div>
                    <div className="edit">
                        <Text as="label" fontWeight="semibold">Phone Number</Text>
                        <Text>{phone}</Text>
                        <Button variant="plain" fontSize="md" fontWeight="semibold" onClick={startEditPhone}>Edit</Button>
                    </div>
                    <div className="edit">
                        <Text as="label" fontWeight="semibold">Email Address</Text>
                        <Text>{email}</Text>
                        <Button variant="plain" fontSize="md" fontWeight="semibold" onClick={startEditEmail}>Edit</Button>
                    </div>
                    <div className="edit">
                        <Text as="label" fontWeight="semibold">Account Password</Text>
                        <Text>{passwordText}</Text>
                        <Button variant="plain" fontSize="md" fontWeight="semibold" onClick={startEditPassword}>Edit</Button>
                    </div>
                    </>
                )}

                {editName && (
                    <NameForm firstN={firstName} lastN={lastName} setEditName={setEditName} />
                )}

                {editPhone && (
                    <PhoneForm phone={phone} setEditPhone={setEditPhone} />
                )}

                {editEmail && (
                    <EmailForm currentEmail={email} setEditEmail={setEditEmail} />
                )}

                {editPassword && (
                    <PasswordForm setEditPassword={setEditPassword} />
                )}
            </div>

            <Separator />

            <Heading as="h3">Sign in preference</Heading>

            <RadioGroup.Root className="preferences" size="lg" colorPalette="orange"
                value={preference} onValueChange={handlePreferenceUpdate}>
                <RadioGroup.Item value="password">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>
                        <Text fontWeight="semibold">Password</Text>
                        <Text className="description">Use a password each time you sign in.</Text>
                    </RadioGroup.ItemText>
                </RadioGroup.Item>
                <RadioGroup.Item value="password-less">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>
                        <Text fontWeight="semibold">Password-less</Text>
                        <Text className="description">Keep your account safer by using an easy, one-time verification code sent to (...) ... 7890 instead of a password.</Text>
                    </RadioGroup.ItemText>
                </RadioGroup.Item>
                <RadioGroup.Item value="two-factor">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>
                        <Text fontWeight="semibold">Two-Factor Authentication</Text>
                        <Text className="description">For the most protection, sign in each time with your password plus a one-time verification code sent to (...) ... 7890.</Text>
                    </RadioGroup.ItemText>
                </RadioGroup.Item>
            </RadioGroup.Root>
        </main>
    );
}
