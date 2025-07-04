"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { Button, Field, Heading, HStack, Input, Separator, Text, Link as LinkUI } from "@chakra-ui/react";
import style from "./login-desktop.module.scss";
import authImage from "@/public/auth-image-desktop.jpg";
import googleLogo from "@/public/google-logo.svg";
import facebookLogo from "@/public/facebook-logo.svg";
import appleLogo from "@/public/apple-logo.svg";
import { PasswordInput } from "@/components/ui/password-input";


export default function LoginDesktop() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("handleSubmit", email, password);
    }, [email, password]);

    return (
        <main className={style.page}>
            <div className="img-wrapper">
                <Image src={authImage} alt="Welcome to Login page" height={500} priority />
            </div>
            <div className="auth-wrapper">
                <div className="title">
                    <Heading as="h1" size="5xl">Sign In</Heading>
                    <Text>Enjoy a smoother shopping exoerience</Text>
                </div>

                <form onSubmit={e => handleSubmit(e)}>
                    <Field.Root required>
                        <Field.Label>
                            Email Address <Field.RequiredIndicator />
                        </Field.Label>
                        <Input value={email} onChange={e => setEmail(e.target.value)} />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>
                            Password <Field.RequiredIndicator />
                        </Field.Label>
                        <PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
                    </Field.Root>

                    <div className="actions">
                        <Button colorPalette="orange" type="submit">Sign In</Button>
                        <Button colorPalette="orange" variant="plain" asChild>
                            <Link href={"/forgot-password"}>Forgot Password?</Link>
                        </Button>
                    </div>
                </form>

                <HStack className="other">
                    <Separator flex="1" />
                    <Text flexShrink="0">Other log in options</Text>
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

                    <div className="signup">
                        Don't have an account?&nbsp;
                        <LinkUI variant="underline" asChild>
                            <Link href={"/register"} title="Go to Sign up page">Sign up</Link>
                        </LinkUI>
                    </div>
                </div>
            </div>
        </main>
    );
}