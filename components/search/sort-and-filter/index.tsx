
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, CloseButton, Drawer, Link as LinkUI, Portal, Separator, Tag } from "@chakra-ui/react";
import style from "./style.module.scss";
import filterIcon from "@/public/filter.svg";
import FilterTags from "./filter-tags";
import SortBy from "./sort-by";
import Filters from "./filters";

export default function SortAndFilter() {

    const [filterCount, setFilterCount] = useState(0);
    const [filterList, setFilterList] = useState([
        {
            id: "b-dell", text: "DELL",
        },
        {
            id: "cr-3", text: "3 Stars and Up",
        },
    ]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(open) document.documentElement.style.overflow = "hidden";
        else document.documentElement.style.overflow = "";
    }, [open]);

    return (
        <section className={style["sort-and-filter"]}>
            <div className="actions">

                <Drawer.Root placement="bottom" open={open} onOpenChange={(e) => setOpen(e.open)}>
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
                                    <Filters />
                                </Drawer.Body>
                                <Drawer.Footer>
                                    <Button colorPalette="orange" className="show-results" onClick={() => setOpen(false)}>Show Results (42)</Button>
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