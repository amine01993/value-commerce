
import Image, { StaticImageData } from "next/image";
import { Fragment, useCallback, useRef, useState } from "react";
import { Accordion, AccordionValueChangeDetails, Button, Portal, Span, Text } from "@chakra-ui/react";
import cartIcon from "@/public/cart-2.svg";

interface PurchasedItemType {
    purchase: {
        items: {
            src: StaticImageData | string;
            name: string;
            price: string;
        }[];
        orderDate: string;
        totalPrice: string;
        paymentType: string;
        deliveryDate: null | string;
    };
}

export default function PurchasedItem({purchase}: PurchasedItemType) {
    
    const container = useRef(null);
    const [open, setOpen] = useState<string[]>([]);

    const toggleItems = useCallback((details: AccordionValueChangeDetails) => {
        console.log(details, details.value)
        setOpen(details.value);
    }, []);

    return (
        <>
        <div className="purchase-order">
            {purchase.items.length > 1 && (
            <>
            <Image src={cartIcon} alt="Purchased Items" width={50} />
            <div className="purchase-items">
                <Text>{purchase.items.length} items purchased</Text>
                <Accordion.Root collapsible defaultValue={[""]} variant="plain" value={open} onValueChange={toggleItems}>
                    <Accordion.Item value="items">
                        <Accordion.ItemTrigger>
                            <Span flex="1" fontWeight="semibold">View all items</Span>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Portal container={container}>
                            <Accordion.ItemContent>
                                <Accordion.ItemBody>
                                    {purchase.items.map((item, index) => (
                                        <Fragment key={`item-${item.name}-i-${index}`}>
                                            <div className="purchase-items-details">
                                                <Image src={item.src} alt={item.name} width={50}/>
                                                <div className="detail-info">
                                                    <Text>{item.name}</Text>
                                                </div>
                                            </div>

                                            <div className="purchase-info"></div>
                                            <div className="purchase-info">
                                                <Text>{item.price}</Text>
                                            </div>
                                            <div className="purchase-info"></div>
                                            <div className="purchase-info"></div>
                                            <div className="purchase-info"></div>
                                        </Fragment>
                                    ))}
                                </Accordion.ItemBody>
                            </Accordion.ItemContent>
                        </Portal>
                    </Accordion.Item>
                </Accordion.Root>
            </div>
            </>
            )}
            {purchase.items.length === 1 && (
            <>
            <Image src={purchase.items[0].src} alt={purchase.items[0].name} height={90} className="single-img" />
            <Text>{purchase.items[0].name}</Text>
            </>
            )}
        </div>
        
        <div className="purchase-info">
            <Text>{purchase.orderDate}</Text>
        </div>
        <div className="purchase-info">
            <Text>{purchase.totalPrice}</Text>
        </div>
        <div className="purchase-info">
            <Text>{purchase.paymentType}</Text>
        </div>
        <div className="purchase-info">
            {purchase.deliveryDate !== null && (
                <>
                <Text fontWeight="semibold" as="span">Delivered on</Text>&nbsp;
                <Text as="span">{purchase.deliveryDate}</Text>
                </>
            )}
            {purchase.deliveryDate === null && (
                <>
                <Text fontWeight="semibold" className="span-2">Awaiting shipment</Text>
                </>
            )}
        </div>
        <div className="purchase-info">
            <Button variant="outline" fontWeight="semibold">View order details</Button>
        </div>

        <div ref={container} className={"order-items" + (open.length ? "" : " hide")}></div>        
        </>
    );
}
