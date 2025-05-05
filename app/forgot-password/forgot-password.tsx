"use client";

import Image from "next/image";
import { FormEvent, useCallback, useState } from "react";
import { Button, Field, Heading, Input, Text } from "@chakra-ui/react";
import style from "./forgot-password.module.scss";
import authImage from "@/public/auth-image.jpg";


export default function ForgotPassword() {

    const [email, setEmail] = useState("");

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("handleSubmit", email);
    }, [email]);

    return (
        <main className={style.page}>
            <div className="img-wrapper">
                <Image src={authImage} alt="Welcome to forgot password page" width={400} priority />
            </div>
            <div className="auth-wrapper">
                <div className="title">
                    <Heading as="h1" size="5xl">Forgot Your Password?</Heading>
                    <Text>Just enter the email address you used to create your account and we’ll send you a reset link.</Text>
                </div>

                <form onSubmit={e => handleSubmit(e)}>
                    <Field.Root required>
                        <Field.Label>
                            Email Address <Field.RequiredIndicator />
                        </Field.Label>
                        <Input value={email} onChange={e => setEmail(e.target.value)} size="xl" />
                    </Field.Root>

                    <div className="actions">
                        <Button colorPalette="orange" type="submit">Send Link</Button>
                    </div>
                </form>

            </div>
        </main>
    );
}