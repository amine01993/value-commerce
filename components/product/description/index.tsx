
import { Accordion, Heading, Text } from "@chakra-ui/react";
import style from "./style.module.scss";

export default function ProductDescription() {

    return (
        <section className={style.description}>

            <Accordion.Root collapsible defaultValue={["desc"]} variant="plain">
                <Accordion.Item value="desc">
                    <Accordion.ItemTrigger>
                        <Heading as="h2" size="xl">Product Description</Heading>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody className="content">
                            <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
                            </Text>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>

        </section>
    );
}