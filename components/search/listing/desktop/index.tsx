
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, createListCollection, Heading, Portal, Select, Separator } from "@chakra-ui/react";
import { queryParamsString } from "@/utils/helpers";
import style from "./style.module.scss";
import r1 from "@/public/results/desktop/r1.jpeg";
import r2 from "@/public/results/desktop/r2.jpeg";
import r3 from "@/public/results/desktop/r3.png";
import r4 from "@/public/results/desktop/r4.png";
import r5 from "@/public/results/desktop/r5.jpeg";
import r6 from "@/public/results/desktop/r6.png";
import r7 from "@/public/results/desktop/r7.png";
import r8 from "@/public/results/desktop/r8.jpeg";
import r9 from "@/public/results/desktop/r9.jpeg";
import r10 from "@/public/results/desktop/r10.jpeg";
import SearchItem from "./search-item";
import FilterTags from "../../sort-and-filter/desktop/filter-tags";

export default function Listing() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const sortTypesData = useRef(createListCollection({
        items: [
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
        ],
    }));

    const resultsData = useRef([
        {
            src: r1,
            name: "Refurbished (Excellent) - Dell Latitude 7480 Laptop 14\" Core i5 6300U 8GB RAM 256GB SSD Win10 Pro WiFi",
            rating: 4.5,
            reviewCount: 2,
            price: 209.42,
            oldPrice: 250.99,
        },
        {
            src: r2,
            name: "Refurbished (Excellent) - Dell Latitude 7490 Laptop 14\" (Intel Core i5-7300U/256GB SSD/16GB RAM/Windows 11)",
            rating: 0,
            reviewCount: 0,
            price: 224.68,
        },
        {
            src: r3,
            name: "Refurbished (Fair) - DELL Latitude E7480 UltraBook i5-6300U, 16GB, 256GB SSD, 14\"HD (1366x768), WEBCAM, WiFi, BT 4.2",
            rating: 4.5,
            reviewCount: 0,
            price: 230,
        },
        {
            src: r4,
            name: "Dell Latitude 5400 14\" Laptop – Intel Core i5-8365U (8th Gen), 16GB RAM, 256GB SSD, FHD (1920x1080), Windows 11 Pro – Refurbished (Excellent Condition)",
            rating: 0,
            reviewCount: 0,
            price: 299,
            oldPrice: 600,
        },
        {
            src: r5,
            name: "Refurbished (Excellent) - Dell Latitude 7480 14\" Laptop - Intel Core i5-6300U @ 2.40GHz - 8GB RAM - 256GB SSD - Windows 10 Pro - Certified Refurbished",
            rating: 0,
            reviewCount: 0,
            price: 229.99,
            oldPrice: 270,
        },
        {
            src: r6,
            name: "Refurbished (Excellent) - Dell Latitude E7470 14\" Laptop (Intel Core i5-6300U/16GB RAM/256GB SSD/Windows 10 Pro)",
            rating: 0,
            reviewCount: 0,
            price: 265,
        },
        {
            src: r7,
            name: "Dell Latitude 5400 14\" Laptop – Intel Core i5-8365U (8th Gen), 16GB RAM, 256GB SSD, FHD (1920x1080), Windows 11 Pro – Refurbished (Excellent Condition)",
            rating: 0,
            reviewCount: 0,
            price: 299,
            oldPrice: 600,
        },
        {
            src: r8,
            name: "Refurbished (Excellent) - Dell Latitude 7480 14\" Laptop - Intel Core i5-6300U @ 2.40GHz - 8GB RAM - 256GB SSD - Windows 10 Pro - Certified Refurbished",
            rating: 0,
            reviewCount: 0,
            price: 229.99,
            oldPrice: 270,
        },
        {
            src: r9,
            name: "Refurbished (Excellent) - Dell Latitude E7470 14\" Laptop (Intel Core i5-6300U/16GB RAM/256GB SSD/Windows 10 Pro)",
            rating: 0,
            reviewCount: 0,
            price: 265,
        },
        {
            src: r10,
            name: "Refurbished (Excellent) - Dell Latitude 7490 Laptop 14\" (Intel Core i5-7300U/256GB SSD/16GB RAM/Windows 11)",
            rating: 0,
            reviewCount: 0,
            price: 224.68,
        },
    ]);

    const [sortType, setSortType] = useState<string>("");
    const handleSortTypeChange = useCallback((val: string[]) => {
        setSortType(val[0]);
        router.push("/search?" + queryParamsString(searchParams, {sort: val[0]}, val[0] === "" ? ["sort"] : []), {scroll: false});
    }, [searchParams]);

    useEffect(() => {
        const type = searchParams.get('sort'); // sort type

        if(type !== null) {
            setSortType(type);
        }
    }, []);

    return (
        <section className={style.listing}>

            <div className="actions">
                <Heading as="h2" size="md" fontWeight="normal" className="count">42 results</Heading>

                <Select.Root defaultValue={["1"]} onValueChange={e => handleSortTypeChange(e.value)}
                    collection={sortTypesData.current} size="md" width="320px" className="sort-by">
                    <Select.HiddenSelect />
                    <Select.Label>Sort by</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select a Sort Type" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {sortTypesData.current.items.map((type) => (
                                <Select.Item item={type} key={type.value}>
                                    {type.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            </div>

            <FilterTags />

            <Separator />

            <ol className="results">
            {resultsData.current.map((item, index) => (
                <li key={"index-" + index}>
                    <SearchItem {...item} />
                </li>
            ))}
            </ol>

            <Button colorPalette="orange" className="load-more">Show more</Button>
        </section>
    )
}
