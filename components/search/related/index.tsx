
import Link from "next/link";
import { useRef } from "react";
import { Button, Heading } from "@chakra-ui/react";
import style from "./style.module.scss";

export default function Related() {

    const keywords = useRef([
        "gaming chairs cheap",
        "office chair",
        "gaming desk",
        "gaming chair with footrest",
        "gaming pc",
        "gaming monitor",
        "gaming chair pink",
        "computer chair",
        "gaming chair with speakers",
        "gaming chair with massage",
        "floor gaming chair",
        "gaming laptop",
    ]);

    return (
        <div className={style.related}>
            <Heading as="h2" size="lg">Related Searches</Heading>
            <ol>
                {keywords.current.map((query, index) => (
                <li key={"index-" + index}>
                    <Link href={"/search?q=" + encodeURIComponent(query)} passHref legacyBehavior>
                        <Button colorPalette="cyan" rounded="full" as="a">{query}</Button>
                    </Link>
                </li>
                ))}
            </ol>
        </div>
    );
}