
import { useRef } from "react";
import { Accordion, RadioGroup, Text } from "@chakra-ui/react";
import style from "./style.module.scss";

export default function SortBy() {
    const items = useRef([
        {
            label: "Best Match",
            value: "1",
        },
        {
            label: "Price Low-High",
            value: "2",
        },
        {
            label: "Price High-Low",
            value: "3",
        },
        {
            label: "Highest Rated",
            value: "4",
        },
    ]);

    return (
        <Accordion.Root collapsible defaultValue={[]} variant="plain" className={style["sort-by"]}>
            <Accordion.Item value="sort-by">
                <Accordion.ItemTrigger>
                    <Text fontWeight="semibold">Sort by: <span>Best Match</span></Text>
                    <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                    <Accordion.ItemBody className="content">
                        <RadioGroup.Root defaultValue="1" colorPalette="blue">
                            <ol>
                                {items.current.map((item) => (
                                <li key={"value-" + item.value}>
                                    <RadioGroup.Item key={item.value} value={item.value}>
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemIndicator />
                                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                </li>
                                ))}
                            </ol>
                        </RadioGroup.Root>
                    </Accordion.ItemBody>
                </Accordion.ItemContent>
            </Accordion.Item>
        </Accordion.Root>
    )
}