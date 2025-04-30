
import { useState } from "react";
import { Link as LinkUI, Separator, Tag } from "@chakra-ui/react";
import style from "./style.module.scss";

export default function FilterTags() {

    const [filterList, setFilterList] = useState([
        {
            id: "b-dell", text: "DELL",
        },
        {
            id: "cr-3", text: "3 Stars and Up",
        },
    ]);

    return (
        <div className={style["filter-tags"]}>
            {filterList.map((filter, index) => (
                <Tag.Root key={"filter-" + filter.id} colorPalette="blue" size="xl">
                    <Tag.Label>{filter.text}</Tag.Label>
                    <Separator orientation="vertical" />
                    <Tag.EndElement>
                        <Tag.CloseTrigger />
                    </Tag.EndElement>
                </Tag.Root>
            ))}

            <LinkUI variant="underline" colorPalette="blue" className="clear-all">Clear all filters</LinkUI>
        </div>
    );
}