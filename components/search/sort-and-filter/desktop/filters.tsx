
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFilter, removeFilter, setBrands, setAvailabilities, setRating, setPriceRange, FilterItem } from "@/lib/slices/search";
import { Accordion, Text, Link as LinkUI, Slider, Button, Checkbox, RadioGroup, RatingGroup, CheckboxGroup } from "@chakra-ui/react";
import { queryParamsString, valueToFilterItem } from "@/utils/helpers";
import style from "./style.module.scss";

export default function Filters() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const disptach = useAppDispatch();

    const category = useMemo(() => searchParams.get('c'), [searchParams]);
  
    const categoriesData = useRef([
        {
            label: "Windows Laptop",
            count: "8,327",
            value: "windows-laptop",
        },
        {
            label: "MacBook",
            count: "1,245",
            value: "macbook",
        },
        {
            label: "Gaming Laptops",
            count: "786",
            value: "gaming-laptops",
        },
        {
            label: "2 in 1 Laptops",
            count: "451",
            value: "2-in-1-laptops",
        },
        {
            label: "Chromebooks",
            count: "123",
            value: "chromebooks",
        },
    ]);
    const brandsData = useRef([
        {
            label: "ACER",
            count: "43",
            value: "ac",
        },
        {
            label: "ASUS",
            count: "140",
            value: "as",
        },
        {
            label: "DELL",
            count: "284",
            value: "de",
        },
        {
            label: "HP",
            count: "139",
            value: "hp",
        },
        {
            label: "LENOVO",
            count: "225",
            value: "le",
        },
        {
            label: "PANASONIC",
            count: "1",
            value: "pa",
        },
        {
            label: "SAMSUNG",
            count: "4",
            value: "sa",
        },
        {
            label: "TOSHIBA",
            count: "54",
            value: "to",
        },
        {
            label: "VIEWSONIC",
            count: "1",
            value: "vi",
        },
    ]);
    const ratingsData = useRef([
        {
            label: "5 Stars",
            count: "7",
            value: "5",
        },
        {
            label: "4 Stars & Up",
            count: "9",
            value: "4",
        },
        {
            label: "3 Stars & Up",
            count: "11",
            value: "3",
        },
    ]);
    const availabilitiesData = useRef([
        {
            label: "New",
            count: "17",
            value: "n",
        },
        {
            label: "Used",
            count: "19",
            value: "u",
        },
    ]);

    const defaultPriceRange = useRef([0, 9800]);
    const priceRange = useAppSelector(state => state.searchSlice.priceRange);
    const brands = useAppSelector(state => state.searchSlice.brands);
    const availabilities = useAppSelector(state => state.searchSlice.availabilities);
    const rating = useAppSelector(state => state.searchSlice.rating);
    const filterData = useAppSelector(state => state.searchSlice.filterData);

    const handlePriceRangeChange = useCallback(() => {

        if(priceRange[0] === defaultPriceRange.current[0] && priceRange[1] === defaultPriceRange.current[1]) {
            disptach(removeFilter(["pr"]));
        }
        else {
            disptach(setFilter(["pr", priceRange]));
        }
    }, [priceRange]);

    const compareRanges = useCallback(() => {
        const pr = filterData["pr"];
        let min = defaultPriceRange.current[0], max = defaultPriceRange.current[1];
        if(pr !== undefined) {
            const nbrs: number[] = pr as number[];
            min = Math.min(...nbrs);
            max = Math.max(...nbrs);
        }
        return min === defaultPriceRange.current[0] && max === defaultPriceRange.current[1];
    }, [filterData]);

    const handleBrandsChange = useCallback((val: string[]) => {

        if(val.length === 0) disptach(removeFilter(["br"]));
        else disptach(setFilter(["br", valueToFilterItem(val, brandsData.current)]));
    }, []);

    const handleAvailabilitiesChange = useCallback((val: string[]) => {

        if(val.length === 0) disptach(removeFilter(["av"]));
        else disptach(setFilter(["av", valueToFilterItem(val, availabilitiesData.current)]));
    }, []);

    const handleRatingChange = useCallback((val: string) => {

        if(val === "") disptach(removeFilter(["ra"]));
        else disptach(setFilter(["ra", valueToFilterItem(val, ratingsData.current)]));
    }, []);

    useEffect(() => {

        const newQuery: {[key: string]: string} = {};
        const deleteParams = [];

        if(filterData["pr"] === undefined) {
            disptach(setPriceRange(defaultPriceRange.current));
            deleteParams.push("pr");
        }
        else {
            disptach(setPriceRange(filterData["pr"] as number[]));
            newQuery["pr"] = (filterData["pr"] as number[]).join(",");
        }

        if(filterData["br"] === undefined) {
            disptach(setBrands([]));
            deleteParams.push("br");
        }
        else {
            disptach(setBrands((filterData["br"] as FilterItem[]).map(item => item.value)));
            newQuery["br"] = (filterData["br"] as FilterItem[]).map(item => item.value).join(",");
        }

        if(filterData["av"] === undefined) {
            disptach(setAvailabilities([]));
            deleteParams.push("av");
        }
        else {
            disptach(setAvailabilities((filterData["av"] as FilterItem[]).map(item => item.value)));
            newQuery["av"] = (filterData["av"] as FilterItem[]).map(item => item.value).join(",");
        }

        if(filterData["ra"] === undefined) {
            disptach(setRating(""));
            deleteParams.push("ra");
        }
        else {
            disptach(setRating((filterData["ra"] as FilterItem).value));
            newQuery["ra"] = (filterData["ra"] as FilterItem).value;
        }

        router.push("/search?" + queryParamsString(searchParams, newQuery, deleteParams), {scroll: false});

    }, [filterData]);

    useEffect(() => {

        const pr = searchParams.get("pr"); // price range
        const br = searchParams.get("br"); // brand
        const av = searchParams.get("av"); // availability
        const ra = searchParams.get("ra"); // rating

        if(pr !== null) {
            const nbrs: number[] = pr.split(",").map(el => Number(el));
            const min = Math.min(...nbrs);
            const max = Math.max(...nbrs);
            disptach(setFilter(["pr", [min, max]]));
        }

        if(br !== null) {
            const _brands: string[] = br.split(",");
            disptach(setFilter(["br", valueToFilterItem(_brands, brandsData.current)]));
        }

        if(av !== null) {
            const _availabilities: string[] = av.split(",");
            disptach(setFilter(["av", valueToFilterItem(_availabilities, availabilitiesData.current)]));
        }

        if(ra !== null) {
            disptach(setFilter(["ra", valueToFilterItem(ra, ratingsData.current)]));
        }
    }, []);

    return (
        <div className={style.filters}>
            <Accordion.Root collapsible defaultValue={["filter-category"]} variant="plain" className="filter">
                <Accordion.Item value="filter-category">
                    <Accordion.ItemTrigger>
                        <Text fontWeight="semibold">Category</Text>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody className="content">
                            <ol>
                                {categoriesData.current.map((item) => (
                                <li key={"value-" + item.value}>
                                    <Link href={"/search?" + queryParamsString(searchParams, {c: item.value})} passHref legacyBehavior>
                                        <LinkUI fontWeight={category === item.value ? "bold" : undefined}>{item.label} <span className="count">({item.count})</span></LinkUI>
                                    </Link>
                                </li>
                                ))}
                            </ol>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>

            <Accordion.Root collapsible defaultValue={["filter-price-range"]} variant="plain" className="filter">
                <Accordion.Item value="filter-price-range">
                    <Accordion.ItemTrigger>
                        <Text fontWeight="semibold">
                            Price Range
                            {!compareRanges() && (<> (1)</>)}
                        </Text>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody className="content">

                            <div className="slider-wrapper">
                                <Text fontWeight="semibold">${priceRange[0]} - ${priceRange[1]}</Text>

                                <div className="slider">
                                    <Slider.Root maxW="md" colorPalette="orange"
                                        min={defaultPriceRange.current[0]} max={defaultPriceRange.current[1]} value={priceRange} 
                                        onValueChange={e => disptach(setPriceRange(e.value))}>
                                        <Slider.Control>
                                            <Slider.Track>
                                                <Slider.Range />
                                            </Slider.Track>
                                            <Slider.Thumbs />
                                        </Slider.Control>
                                    </Slider.Root>

                                    <Button variant="outline" onClick={() => handlePriceRangeChange()}>Go</Button>
                                </div>
                            </div>

                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>

            <Accordion.Root collapsible defaultValue={["filter-brand"]} variant="plain" className="filter">
                <Accordion.Item value="filter-brand">
                    <Accordion.ItemTrigger>
                        <Text fontWeight="semibold">
                            Brand
                            {brands.length > 0 && (<> ({brands.length})</>)}
                        </Text>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody className="content">
                            <CheckboxGroup value={brands} onValueChange={val => handleBrandsChange(val)} name="brands" colorPalette="blue">
                                <ol>
                                    {brandsData.current.map((item) => (
                                    <li key={"value-" + item.value}>
                                        <Checkbox.Root value={item.value}>
                                            <Checkbox.HiddenInput />
                                            <Checkbox.Control />
                                            <Checkbox.Label>{item.label} <span className="count">({item.count})</span></Checkbox.Label>
                                        </Checkbox.Root>
                                    </li>
                                    ))}
                                </ol>
                            </CheckboxGroup>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>

            <Accordion.Root collapsible defaultValue={["filter-rating"]} variant="plain" className="filter">
                <Accordion.Item value="filter-rating">
                    <Accordion.ItemTrigger>
                        <Text fontWeight="semibold">
                            Customer Rating
                            {rating !== "" && (<> (1)</>)}
                        </Text>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody className="content">
                            <RadioGroup.Root value={rating} onValueChange={e => handleRatingChange(e.value!)} name="rating" colorPalette="blue">
                                <ol>
                                    {ratingsData.current.map((item) => (
                                    <li key={"value-" + item.value}>
                                        <RadioGroup.Item value={item.value}>
                                            <RadioGroup.ItemHiddenInput />
                                            <RadioGroup.ItemIndicator />
                                            <RadioGroup.ItemText>
                                                <RatingGroup.Root allowHalf count={5} defaultValue={Number(item.value)} size="sm" colorPalette="yellow" readOnly>
                                                    <RatingGroup.HiddenInput />
                                                    <RatingGroup.Control />
                                                </RatingGroup.Root>
                                                {item.label} <span className="count">({item.count})</span>
                                            </RadioGroup.ItemText>
                                        </RadioGroup.Item>
                                    </li>
                                    ))}
                                </ol>
                            </RadioGroup.Root>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>

            <Accordion.Root collapsible defaultValue={["filter-availability"]} variant="plain" className="filter">
                <Accordion.Item value="filter-availability">
                    <Accordion.ItemTrigger>
                        <Text fontWeight="semibold">
                            Availability
                            {availabilities.length > 0 && (<> ({availabilities.length})</>)}
                        </Text>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody className="content">
                            <CheckboxGroup value={availabilities} onValueChange={val => handleAvailabilitiesChange(val)} name="availabilities" colorPalette="blue">
                                <ol>
                                    {availabilitiesData.current.map((item) => (
                                    <li key={"value-" + item.value}>
                                        <Checkbox.Root value={item.value}>
                                            <Checkbox.HiddenInput />
                                            <Checkbox.Control />
                                            <Checkbox.Label>{item.label} <span className="count">({item.count})</span></Checkbox.Label>
                                        </Checkbox.Root>
                                    </li>
                                    ))}
                                </ol>
                            </CheckboxGroup>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>
        </div>
    )
}