
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, CloseButton, Drawer, DrawerOpenChangeDetails, Portal, Separator } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FilterItem, setAvailabilities, setBrands, setFilter, setPriceRange, setRating } from "@/lib/slices/search";
import { queryParamsString, valueToFilterItem } from "@/utils/helpers";
import style from "./style.module.scss";
import FilterTags from "./filter-tags";
import SortBy from "./sort-by";
import Filters from "./filters";
import filterIcon from "@/public/filter.svg";

export default function SortAndFilter() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const filterData = useAppSelector(state => state.searchSlice.filterData);
    const filterCount = useMemo(() => {
        return Object.keys(filterData).length;
    }, [filterData]);

    const [open, setOpen] = useState(false);
    
    const defaultPriceRange = useRef([0, 9800]);
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

    const handleFilterDrawer = useCallback((details: DrawerOpenChangeDetails) => {
        setOpen(details.open)
    }, []);

    const closeFilterDrawer = useCallback(() => {
        setOpen(false)
    }, []);

    useEffect(() => {
        if(open) document.documentElement.style.overflow = "hidden";
        else document.documentElement.style.overflow = "";
    }, [open]);

    useEffect(() => {
        const newQuery: {[key: string]: string} = {};
        const deleteParams = [];

        if(filterData["pr"] === undefined) {
            dispatch(setPriceRange(defaultPriceRange.current));
            deleteParams.push("pr");
        }
        else {
            dispatch(setPriceRange(filterData["pr"] as number[]));
            newQuery["pr"] = (filterData["pr"] as number[]).join(",");
        }

        if(filterData["br"] === undefined) {
            dispatch(setBrands([]));
            deleteParams.push("br");
        }
        else {
            dispatch(setBrands((filterData["br"] as FilterItem[]).map(item => item.value)));
            newQuery["br"] = (filterData["br"] as FilterItem[]).map(item => item.value).join(",");
        }

        if(filterData["av"] === undefined) {
            dispatch(setAvailabilities([]));
            deleteParams.push("av");
        }
        else {
            dispatch(setAvailabilities((filterData["av"] as FilterItem[]).map(item => item.value)));
            newQuery["av"] = (filterData["av"] as FilterItem[]).map(item => item.value).join(",");
        }

        if(filterData["ra"] === undefined) {
            dispatch(setRating(""));
            deleteParams.push("ra");
        }
        else {
            dispatch(setRating((filterData["ra"] as FilterItem).value));
            newQuery["ra"] = (filterData["ra"] as FilterItem).value;
        }

        router.push("/search?" + queryParamsString(searchParams, newQuery, deleteParams), {scroll: false});

    }, [filterData]);
    
    useEffect(() => {

        const pr = searchParams.get("pr");
        const br = searchParams.get("br");
        const av = searchParams.get("av");
        const ra = searchParams.get("ra");

        if(pr !== null) {
            const nbrs: number[] = pr.split(",").map(el => Number(el));
            const min = Math.min(...nbrs);
            const max = Math.max(...nbrs);
            dispatch(setFilter(["pr", [min, max]]));
        }

        if(br !== null) {
            const _brands: string[] = br.split(",");
            dispatch(setFilter(["br", valueToFilterItem(_brands, brandsData.current)]));
        }

        if(av !== null) {
            const _availabilities: string[] = av.split(",");
            dispatch(setFilter(["av", valueToFilterItem(_availabilities, availabilitiesData.current)]));
        }

        if(ra !== null) {
            dispatch(setFilter(["ra", valueToFilterItem(ra, ratingsData.current)]));
        }
    }, []);

    return (
        <section className={style["sort-and-filter"]}>
            <div className="actions">

                <Drawer.Root placement="bottom" open={open} onOpenChange={handleFilterDrawer}>
                    <Drawer.Trigger asChild>
                        <Button variant="outline">
                            <Image src={filterIcon} alt="Sort and Filter Icon" height={20} width={20} />
                            Sort & Filter {filterCount > 0 && (
                                <>({filterCount})</>
                            )}
                        </Button>
                    </Drawer.Trigger>
                    <Portal>
                        <Drawer.Backdrop />
                        <Drawer.Positioner>
                            <Drawer.Content className={style.content}>
                                <Drawer.Header>
                                    <Drawer.Title>Sort & Filter</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <FilterTags />
                                    <SortBy />
                                    <Filters 
                                        defaultPriceRange={defaultPriceRange} 
                                        categoriesData={categoriesData} 
                                        brandsData={brandsData} 
                                        ratingsData={ratingsData} 
                                        availabilitiesData={availabilitiesData} 
                                    />
                                </Drawer.Body>
                                <Drawer.Footer>
                                    <Button colorPalette="orange" className="show-results" onClick={closeFilterDrawer}>Show Results (42)</Button>
                                </Drawer.Footer>
                                <Drawer.CloseTrigger asChild>
                                    <CloseButton size="xl" top="5px" right="5px" />
                                </Drawer.CloseTrigger>
                            </Drawer.Content>
                        </Drawer.Positioner>
                    </Portal>
                </Drawer.Root>
        
            </div>

            <FilterTags />

            <Separator bgColor="var(--chakra-colors-gray-300)" />
        </section>
    );
}