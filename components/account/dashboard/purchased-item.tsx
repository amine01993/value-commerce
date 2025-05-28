
import Image, { StaticImageData } from "next/image";
import { Fragment, useRef } from "react";
import { Accordion, Portal, Separator, Span, Text } from "@chakra-ui/react";
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

    return (
        <div className="purchase" ref={container}>
            
            {purchase.items.length > 1 && (
            <div className="purchase-header">
                <Image src={cartIcon} alt="Purchased Items" height={40} />
                <div className="purchase-items">
                    <Text>{purchase.items.length} items purchased</Text>
                    <Accordion.Root collapsible defaultValue={[""]} variant="plain">
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
                                                    <Image src={item.src} alt={item.name} height={50}/>
                                                    <div className="detail-info">
                                                        <Text>{item.name}</Text>
                                                        <div className="detail-price">
                                                            <Text fontWeight="semibold">Total price</Text>
                                                            <Text>{item.price}</Text>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Separator />
                                            </Fragment>
                                        ))}
                                    </Accordion.ItemBody>
                                </Accordion.ItemContent>
                            </Portal>
                        </Accordion.Item>
                    </Accordion.Root>
                </div>
            </div>
            )}
            {purchase.items.length === 1 && (
            <div className="purchase-header">
                <Image src={purchase.items[0].src} alt={purchase.items[0].name} height={90} className="single-img" />
                <Text>{purchase.items[0].name}</Text>
            </div>
            )}
            <div className="purchase-info">
                <Text fontWeight="semibold">Order date</Text>
                <Text>{purchase.orderDate}</Text>
                <Text fontWeight="semibold">Total price</Text>
                <Text>{purchase.totalPrice}</Text>
                <Text fontWeight="semibold">Payment type</Text>
                <Text>{purchase.paymentType}</Text>
                {purchase.deliveryDate !== null && (
                    <>
                    <Text fontWeight="semibold">Delivered on</Text>
                    <Text>{purchase.deliveryDate}</Text>
                    </>
                )}
                {purchase.deliveryDate === null && (
                    <>
                    <Text fontWeight="semibold" className="span-2">Awaiting shipment</Text>
                    </>
                )}
            </div>

            <Separator bgColor="gray.300" />
        </div>
    );
}
