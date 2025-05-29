
import { Accordion, Heading, Text } from "@chakra-ui/react";
import style from "./style.module.scss";

export default function ProductSpecifications() {

    return (
        <section className={style.specifications}>

            <Accordion.Root collapsible defaultValue={["specs"]} variant="plain">
                <Accordion.Item value="specs">
                    <Accordion.ItemTrigger>
                        <Heading as="h2" size="xl">Product Specifications</Heading>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody className="content">
                            <Text fontWeight="semibold">Product Name</Text>
                            <Text>Product Name</Text>
                            <Text fontWeight="semibold">Brand</Text>
                            <Text>Brand</Text>
                            <Text fontWeight="semibold">Model Number / SKU</Text>
                            <Text>Model Number / SKU</Text>
                            <Text fontWeight="semibold">Dimensions (L x W x H)</Text>
                            <Text>Dimensions (L x W x H)</Text>
                            <Text fontWeight="semibold">Weight</Text>
                            <Text>Weight</Text>
                            <Text fontWeight="semibold">Color(s)</Text>
                            <Text>Color(s)</Text>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>

        </section>
    );
}