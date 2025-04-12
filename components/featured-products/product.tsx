
import Image, { StaticImageData } from "next/image";
import { useMemo } from "react";
import { Heading, Text } from "@chakra-ui/react";
import style from "./style.module.scss";

interface ProductInputType {
    src: StaticImageData|string;
    alt: string;
    title: string;
    isPriority?: boolean;
    price: number;
    discountedPrice?: number;
}

export default function Product({src, alt, title, isPriority, price, discountedPrice}: ProductInputType) {

    const priceFormatted = useMemo(() => {
        return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(price);
    }, []);

    const discountFormatted = useMemo(() => {
        if(discountedPrice === undefined) return "";
        return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(discountedPrice);
    }, []);

    return (
        <div className={style.product}>
            <Image src={src} alt={alt} priority={isPriority} height={160} width={160}
                style={{objectFit: "cover", objectPosition: "center", height: 160, width: 160, minWidth: 160, aspectRatio: 1, borderRadius: "1rem"}} />
            <Heading as="h3" size="md">{title}</Heading>
            <div className={style.prices}>
                <Text fontWeight="semibold" className={discountedPrice !== undefined ? style.original : undefined}>{priceFormatted}</Text>
                {discountedPrice !== undefined && <Text className={style.discount} textStyle="sm">{discountFormatted}</Text>}
            </div>
        </div>
    );
}
