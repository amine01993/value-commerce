"use client";

import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Language, setLanguage } from "@/lib/slices/user";
import { Button, Heading } from "@chakra-ui/react";
import style from "./style.module.scss";

export default function LanguagesDesktop() {

    const langs = useRef([
        {
            label: "English",
            locale: "en",
        },
        {
            label: "Français",
            locale: "fr",
        },
    ]);

    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.userSlice.language);

    const handleLanguageUpdate = useCallback((lang: Language) => {
        dispatch(setLanguage(lang));
    }, []);

    return (
        <section className={style.langs}>
            <Heading as="h2" size="lg">Choose a language</Heading>
            <ul>
                {langs.current.map(lang => (
                    <li key={"lang-choice-" + lang.locale}>
                        <Button variant="ghost" colorPalette="orange" className={lang.locale === language.locale ? "active" : undefined} 
                            onClick={() => handleLanguageUpdate(lang)}>
                            {lang.label}
                        </Button>
                    </li>
                ))}
            </ul>
        </section>
    );
}