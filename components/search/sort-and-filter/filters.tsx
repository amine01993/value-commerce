
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Accordion, Text, Link as LinkUI, Heading, Slider, Button, Checkbox, RadioGroup, RatingGroup } from "@chakra-ui/react";
import style from "./style.module.scss";

export default function Filters() {

    const searchParams = useSearchParams();
    const category = searchParams.get('c');
  
    const query = useAppSelector(state => state.mainSlice.query);
    const categories = useRef([
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
    const brands = useRef([
        {
            label: "ACER",
            count: "43",
            value: "acer",
        },
        {
            label: "ASUS",
            count: "140",
            value: "asus",
        },
        {
            label: "DELL",
            count: "284",
            value: "dell",
        },
        {
            label: "HP",
            count: "139",
            value: "hp",
        },
        {
            label: "LENOVO",
            count: "225",
            value: "lenovo",
        },
        {
            label: "PANASONIC",
            count: "1",
            value: "panasonic",
        },
        {
            label: "SAMSUNG",
            count: "4",
            value: "samsung",
        },
        {
            label: "TOSHIBA",
            count: "54",
            value: "toshiba",
        },
        {
            label: "VIEWSONIC",
            count: "1",
            value: "viewsonic",
        },
    ]);
    const ratings = useRef([
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
    const availabilities = useRef([
        {
            label: "New",
            count: "17",
            value: "new",
        },
        {
            label: "Used",
            count: "19",
            value: "used",
        },
    ]);

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
                                {categories.current.map((item) => (
                                <li key={"value-" + item.value}>
                                    <Link href={"/search?q=" + encodeURIComponent(query) + "&c=" + encodeURIComponent(item.value)} passHref legacyBehavior>
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
                        <Text fontWeight="semibold">Price Range</Text>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody className="content">

                            <div className="slider-wrapper">
                                <Text fontWeight="semibold">$0 - $9,800+</Text>

                                <div className="slider">
                                    <Slider.Root maxW="md" min={0} max={9800} defaultValue={[0, 9800]} colorPalette="orange">
                                        <Slider.Control>
                                            <Slider.Track>
                                                <Slider.Range />
                                            </Slider.Track>
                                            <Slider.Thumbs />
                                        </Slider.Control>
                                    </Slider.Root>

                                    <Button variant="outline">Go</Button>
                                </div>
                            </div>

                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>

            <Accordion.Root collapsible defaultValue={[]} variant="plain" className="filter">
                <Accordion.Item value="filter-brand">
                    <Accordion.ItemTrigger>
                        <Text fontWeight="semibold">Brand (1)</Text>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody className="content">
                            <ol>
                                {brands.current.map((item) => (
                                <li key={"value-" + item.value}>
                                    <Checkbox.Root colorPalette="blue">
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control />
                                        <Checkbox.Label>{item.label} <span className="count">({item.count})</span></Checkbox.Label>
                                    </Checkbox.Root>
                                </li>
                                ))}
                            </ol>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>

            <Accordion.Root collapsible defaultValue={[]} variant="plain" className="filter">
                <Accordion.Item value="filter-rating">
                    <Accordion.ItemTrigger>
                        <Text fontWeight="semibold">Customer Rating (1)</Text>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody className="content">
                            <RadioGroup.Root defaultValue="3" colorPalette="blue">
                                <ol>
                                    {ratings.current.map((item) => (
                                    <li key={"value-" + item.value}>
                                        <RadioGroup.Item key={item.value} value={item.value}>
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
                        <Text fontWeight="semibold">Availability</Text>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody className="content">
                            <ol>
                                {availabilities.current.map((item) => (
                                <li key={"value-" + item.value}>
                                    <Checkbox.Root colorPalette="blue">
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control />
                                        <Checkbox.Label>{item.label} <span className="count">({item.count})</span></Checkbox.Label>
                                    </Checkbox.Root>
                                </li>
                                ))}
                            </ol>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>
        </div>
    )
}