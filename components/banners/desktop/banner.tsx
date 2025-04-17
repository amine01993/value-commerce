import Image, { StaticImageData } from "next/image";
import { Button, Heading } from "@chakra-ui/react";
import style from "./style.module.scss";

interface BannerInputType {
    src: StaticImageData|string;
    alt: string;
    heading: string;
    text: string;
    buttonText: string;
    isPriority?: boolean;
}

export default function Banner({src, alt, heading, text, buttonText, isPriority}: BannerInputType) {

    return (
        <div className={style.banner}>
            <Image src={src} alt={alt} priority={isPriority} fill
                style={{objectFit: "cover", objectPosition: "center"}} />
            <div className={style.text}>
                <Heading as="h1">{heading}</Heading>
                <p>{text}</p>
                <Button colorPalette="orange" variant="subtle">{buttonText}</Button>
            </div>
        </div>
    );
}