"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { Button, Field, Heading, HStack, Input, Separator, Text, Link as LinkUI } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { containsLetter, containsNumber, containsSymbol } from "@/utils/validators";
import style from "./register-desktop.module.scss";
import authImage from "@/public/auth-image-desktop.jpg";
import googleLogo from "@/public/google-logo.svg";
import facebookLogo from "@/public/facebook-logo.svg";
import appleLogo from "@/public/apple-logo.svg";
import validIcon from "@/public/check-valid.svg";
import invalidIcon from "@/public/x-invalid.svg";

export default function RegisterDesktop() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [focusPass, setFocusPass] = useState<boolean>(false);
    const [blurPass, setBlurPass] = useState<boolean>(false);
    const [is8CharactersLong, setIs8CharactersLong] = useState<boolean>();
    const [containLetter, setContainLetter] = useState<boolean>();
    const [containNumber, setContainNumber] = useState<boolean>();
    const [containSymbol, setContainSymbol] = useState<boolean>();

    const handleFocusPassword = useCallback(() => {
        setFocusPass(true);
    }, []);

    const handleBlurPassword = useCallback(() => {
        setBlurPass(true);
    }, []);

    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setPassword(val);
        setIs8CharactersLong(val.length >= 8);
        setContainLetter(containsLetter(val));
        setContainNumber(containsNumber(val));
        setContainSymbol(containsSymbol(val));
    }, []);

    const invalidPassword = useMemo(() => {
        return !is8CharactersLong || !containLetter || !containNumber || !containSymbol;
    }, [is8CharactersLong, containLetter, containNumber, containSymbol]);

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("handleSubmit", firstName, lastName, email, password);
    }, [firstName, lastName, email, password]);

    return (
        <main className={style.page}>
            <div className="img-wrapper">
                <Image src={authImage} alt="Welcome to Sign up page" height={500} priority />
            </div>
            <div className="auth-wrapper">
                <Heading as="h1" size="5xl">Create an Account</Heading>

                <form onSubmit={e => handleSubmit(e)}>
                    <Field.Root required>
                        <Field.Label>
                            First Name <Field.RequiredIndicator />
                        </Field.Label>
                        <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>
                            Last Name <Field.RequiredIndicator />
                        </Field.Label>
                        <Input value={lastName} onChange={e => setLastName(e.target.value)} />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>
                            Email Address <Field.RequiredIndicator />
                        </Field.Label>
                        <Input value={email} onChange={e => setEmail(e.target.value)} />
                    </Field.Root>

                    <Field.Root required invalid={blurPass && invalidPassword}>
                        <Field.Label>
                            Password <Field.RequiredIndicator />
                        </Field.Label>
                        <PasswordInput value={password} onChange={e => handlePasswordChange(e)}
                            onFocus={() => handleFocusPassword()} onBlur={() => handleBlurPassword()} />
                        <Field.ErrorText>Please review the password requirements.</Field.ErrorText>
                    </Field.Root>

                    {focusPass && (
                        <div className="password-requirements">
                            <Text fontWeight="semibold">Your password must:</Text>
                            <ul>
                                <li aria-live="assertive" aria-atomic="true" 
                                    className={`${is8CharactersLong ? "valid" : ""} ${is8CharactersLong === false || blurPass && !is8CharactersLong ? "invalid" : ""}`}>
                                    {is8CharactersLong && <Image src={validIcon} alt="valid requirement icon" height={15} />}
                                    {(is8CharactersLong === false || blurPass && !is8CharactersLong) && <Image src={invalidIcon} alt="invalid requirement icon" height={15} />}
                                    be at least 8 characters long.
                                </li>
                                <li aria-live="assertive" aria-atomic="true"
                                    className={`${containLetter ? "valid" : ""} ${blurPass && !containLetter ? "invalid" : ""}`}>
                                    {containLetter && <Image src={validIcon} alt="valid requirement icon" height={15} />}
                                    {(containLetter === false || blurPass && !containLetter) && <Image src={invalidIcon} alt="invalid requirement icon" height={15} />}
                                    contain a letter.
                                </li>
                                <li aria-live="assertive" aria-atomic="true"
                                    className={`${containNumber ? "valid" : ""} ${blurPass && !containNumber ? "invalid" : ""}`}>
                                    {containNumber && <Image src={validIcon} alt="valid requirement icon" height={15} />}
                                    {(containNumber === false || blurPass && !containNumber) && <Image src={invalidIcon} alt="invalid requirement icon" height={15} />}
                                    contain a number.
                                </li>
                                <li aria-live="assertive" aria-atomic="true"
                                    className={`${containSymbol ? "valid" : ""} ${blurPass && !containSymbol ? "invalid" : ""}`}>
                                    {containSymbol && <Image src={validIcon} alt="valid requirement icon" height={15} />}
                                    {(containSymbol === false || blurPass && !containSymbol) && <Image src={invalidIcon} alt="invalid requirement icon" height={15} />}
                                    contain a symbol.
                                </li>
                            </ul>
                        </div>
                    )}

                    <div className="actions">
                        <Button colorPalette="orange" type="submit">Create Account</Button>
                    </div>
                </form>

                <HStack className="other">
                    <Separator flex="1" />
                    <Text flexShrink="0">Other sign up options</Text>
                    <Separator flex="1" />
                </HStack>

                <div className="options">
                    <div className="social-auth">
                        <Button colorPalette="orange" variant="outline">
                            <Image src={googleLogo} alt="Google logo" height={25} />
                        </Button>
                        <Button colorPalette="orange" variant="outline">
                            <Image src={facebookLogo} alt="Facebook logo" height={25} />
                        </Button>
                        <Button colorPalette="orange" variant="outline">
                            <Image src={appleLogo} alt="Apple logo" height={25} />
                        </Button>
                    </div>

                    <div className="terms">
                        By signing up, you agree to our <LinkUI variant="underline">Terms of Use</LinkUI> and <LinkUI variant="underline">Privacy Policy</LinkUI>.
                    </div>

                    <div className="signup">
                        Don't have an account?&nbsp;
                        <LinkUI variant="underline" asChild>
                            <Link href={"/login"} title="Go to Log in page">Log in</Link>
                        </LinkUI>
                    </div>
                </div>
            </div>
        </main>
    );
}