
import Image, { StaticImageData } from "next/image";
import { Heading } from "@chakra-ui/react";
import style from "./style.module.scss";

interface CategoryInputType {
    src: StaticImageData|string;
    alt: string;
    heading: string;
    isPriority?: boolean;
}

export default function Category({src, alt, heading, isPriority}: CategoryInputType) {

    return (
        <div className={style.category}>
            <Image src={src} alt={alt} priority={isPriority} width={300} height={300}
                style={{objectFit: "cover", objectPosition: "center", aspectRatio: 1, borderRadius: "50%"}} />
            <Heading as="h3" size="md">{heading}</Heading>
        </div>
    );
}
