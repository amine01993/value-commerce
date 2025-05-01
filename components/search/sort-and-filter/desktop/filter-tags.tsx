
import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FilterItem, removeFilter, clearFilter } from "@/lib/slices/search";
import { Link as LinkUI, Separator, Tag } from "@chakra-ui/react";
import style from "./style.module.scss";

export default function FilterTags() {

    const dispatch = useAppDispatch();
    const filterData = useAppSelector(state => state.searchSlice.filterData);

    const filterArray = useMemo(() => {
        return Object.entries(filterData).map((entry) => {
            return entry;
        })
    }, [filterData]);

    const handleDeleteFilter = useCallback((key: string, value?: string) => {
        dispatch(removeFilter([key, value]));
    }, []);

    const handleClearFilters = useCallback(() => {
        dispatch(clearFilter());
    }, []);

    return (
        <div className={style["filter-tags"]}>
            {filterArray.map(([key, value]) => (
                <>
                {["br", "av"].includes(key) && (value as FilterItem[]).map((item) => (
                    <Tag.Root key={"filter-" + key + "-" + item.value} colorPalette="blue" size="xl">
                        <Tag.Label>{item.label}</Tag.Label>
                        <Separator orientation="vertical" />
                        <Tag.EndElement>
                            <Tag.CloseTrigger onClick={() => handleDeleteFilter(key, item.value)} />
                        </Tag.EndElement>
                    </Tag.Root>
                ))}

                {!["br", "av"].includes(key) && (
                    <Tag.Root key={"filter-" + key} colorPalette="blue" size="xl">
                        {key === "pr" && (
                            <Tag.Label>${(value as number[])[0]} - ${(value as number[])[1]}</Tag.Label>
                        )}
                        {key === "ra" && (
                            <Tag.Label>{(value as FilterItem).label}</Tag.Label>
                        )}
                        <Separator orientation="vertical" />
                        <Tag.EndElement>
                            <Tag.CloseTrigger onClick={() => handleDeleteFilter(key)} />
                        </Tag.EndElement>
                    </Tag.Root>
                )}
                </>
            ))}

            {filterArray.length > 0 && (
                <LinkUI variant="underline" colorPalette="blue" className="clear-all" onClick={() => handleClearFilters()}>Clear all filters</LinkUI>
            )}
        </div>
    );
}