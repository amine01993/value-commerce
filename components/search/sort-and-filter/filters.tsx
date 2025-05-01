
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RefObject, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeFilter, setFilter, setPriceRange } from "@/lib/slices/search";
import { Accordion, Text, Link as LinkUI, Heading, Slider, Button, Checkbox, RadioGroup, RatingGroup, CheckboxGroup } from "@chakra-ui/react";
import { queryParamsString, valueToFilterItem } from "@/utils/helpers";
import style from "./style.module.scss";

interface FiltersType {
    defaultPriceRange: RefObject<number[]>;
    categoriesData: RefObject<{ label: string; count: string; value: string;}[]>;
    brandsData: RefObject<{ label: string; count: string; value: string;}[]>;
    ratingsData: RefObject<{ label: string; count: string; value: string;}[]>;
    availabilitiesData: RefObject<{ label: string; count: string; value: string;}[]>;
}

export default function Filters({defaultPriceRange, categoriesData, brandsData, ratingsData, availabilitiesData}: FiltersType) {

    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const category = useMemo(() => searchParams.get('c'), [searchParams]);
    
    const priceRange = useAppSelector(state => state.searchSlice.priceRange);
    const brands = useAppSelector(state => state.searchSlice.brands);
    const availabilities = useAppSelector(state => state.searchSlice.availabilities);
    const rating = useAppSelector(state => state.searchSlice.rating);
    const filterData = useAppSelector(state => state.searchSlice.filterData);

    const handlePriceRangeChange = useCallback(() => {

        if(priceRange[0] === defaultPriceRange.current[0] && priceRange[1] === defaultPriceRange.current[1]) {
            dispatch(removeFilter(["pr"]));
        }
        else {
            dispatch(setFilter(["pr", priceRange]));
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

        if(val.length === 0) dispatch(removeFilter(["br"]));
        else dispatch(setFilter(["br", valueToFilterItem(val, brandsData.current)]));
    }, []);

    const handleAvailabilitiesChange = useCallback((val: string[]) => {

        if(val.length === 0) dispatch(removeFilter(["av"]));
        else dispatch(setFilter(["av", valueToFilterItem(val, availabilitiesData.current)]));
    }, []);

    const handleRatingChange = useCallback((val: string) => {

        if(val === "") dispatch(removeFilter(["ra"]));
        else dispatch(setFilter(["ra", valueToFilterItem(val, ratingsData.current)]));
    }, []);

    return (
        <div className={style.filters}>
            <Heading as="h2" fontSize="lg">Filters</Heading>

            <Accordion.Root collapsible defaultValue={[]} variant="plain" className="filter">
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

            <Accordion.Root collapsible defaultValue={[]} variant="plain" className="filter">
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
                                        onValueChange={e => dispatch(setPriceRange(e.value))}>
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

            <Accordion.Root collapsible defaultValue={[]} variant="plain" className="filter">
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

            <Accordion.Root collapsible defaultValue={[]} variant="plain" className="filter">
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

            <Accordion.Root collapsible defaultValue={[]} variant="plain" className="filter">
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