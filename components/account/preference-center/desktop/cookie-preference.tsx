
import { Dispatch, memo, SetStateAction, useCallback, useMemo, useState } from "react";
import { Accordion, Button, CloseButton, Drawer, Heading, Switch, SwitchCheckedChangeDetails, Text } from "@chakra-ui/react";
import style from "./style.module.scss";

interface CookiePreferenceType {
    setOpenCookies: Dispatch<SetStateAction<boolean>>;
}

export default memo(function CookiePreference({setOpenCookies}: CookiePreferenceType) {

    const [performance, setPerformance] = useState(true);
    const [functional, setFunctional] = useState(true);
    const [targeting, setTargeting] = useState(true);

    const allSelected = useMemo(() => {
        return performance && functional && targeting;
    }, [performance, functional, targeting]);

    const handlePerformanceChange = useCallback((details: SwitchCheckedChangeDetails) => {
        setPerformance(details.checked);
    }, []);

    const handleFunctionalChange = useCallback((details: SwitchCheckedChangeDetails) => {
        setFunctional(details.checked);
    }, []);

    const handleTargetingChange = useCallback((details: SwitchCheckedChangeDetails) => {
        setTargeting(details.checked);
    }, []);

    const acceptAll = useCallback(() => {
        setPerformance(true);
        setFunctional(true);
        setTargeting(true);
    }, []);

    const savePreferences = useCallback(() => {
        setOpenCookies(false);
    }, [performance, functional, targeting]);

    return (
        <Drawer.Content className={style["cookie-drawer"]}>
            <Drawer.Header>
                <Drawer.Title fontSize="md">Cookie Preferences</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <div className="description">
                    <Text fontSize="sm">
                        When you visit any website, it may store or retrieve information on your device, mostly in the form of cookies. 
                        Cookies are vital to enhancing site performance and delivering helpful, personalized content. 
                        You can explore the different types of cookies below.
                    </Text>
                    <Text fontSize="sm">
                        Since your privacy is important to us, you can choose to only enable some types of cookies.
                        <Text as="span" fontWeight="semibold">However, disabling them may impact your shopping experience and the services we offer.</Text>
                    </Text>
                </div>

                <Button colorPalette="orange" className={"accept-all" + (allSelected ? " hide" : "")} onClick={acceptAll}>
                    Accept all
                </Button>

                <Accordion.Root multiple defaultValue={[]} variant="enclosed">
                    <Accordion.Item value="essential">
                        <Accordion.ItemTrigger>
                            <Accordion.ItemIndicator />
                            <Heading flex="1" as="h4" fontSize="sm">
                                Essential Cookies
                            </Heading>
                            <Text color="orange.600" fontWeight="semibold" fontSize="sm">Always active</Text>
                        </Accordion.ItemTrigger>
                        
                        <Accordion.ItemContent>
                            <Accordion.ItemBody>
                                Essential cookies are necessary for our website to function and cannot be switched off. 
                                They do not store any personally identifiable information and are only set in response to actions you make such as setting your privacy preferences or logging in and filling in forms.
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>

                    <Accordion.Item value="performance">
                        <Accordion.ItemTrigger>
                            <Accordion.ItemIndicator />
                            <Heading flex="1" as="h4" fontSize="sm">
                                Performance Cookies
                            </Heading>
                        </Accordion.ItemTrigger>
                        <Switch.Root colorPalette="green" checked={performance} onCheckedChange={handlePerformanceChange}>
                            <Switch.HiddenInput />
                            <Switch.Control />
                        </Switch.Root>
                        <Accordion.ItemContent>
                            <Accordion.ItemBody>
                                Performance cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. 
                                All of the information collected by these cookies is aggregated and therefore anonymous.
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>

                    <Accordion.Item value="functional">
                        <Accordion.ItemTrigger>
                            <Accordion.ItemIndicator />
                            <Heading flex="1" as="h4" fontSize="sm">
                                Functional Cookies
                            </Heading>
                        </Accordion.ItemTrigger>
                        <Switch.Root colorPalette="green" checked={functional} onCheckedChange={handleFunctionalChange}>
                            <Switch.HiddenInput />
                            <Switch.Control />
                        </Switch.Root>
                        <Accordion.ItemContent>
                            <Accordion.ItemBody>
                                Functional cookies enable us to implement certain features and website functionalities to enhance your experience. 
                                These features can include automatically-filled text boxes or Live Chat help.
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>

                    <Accordion.Item value="targeting">
                        <Accordion.ItemTrigger>
                            <Accordion.ItemIndicator />
                            <Heading flex="1" as="h4" fontSize="sm">
                                Targeting Cookies
                            </Heading>
                        </Accordion.ItemTrigger>
                        <Switch.Root colorPalette="green" checked={targeting} onCheckedChange={handleTargetingChange}>
                            <Switch.HiddenInput />
                            <Switch.Control />
                        </Switch.Root>
                        <Accordion.ItemContent>
                            <Accordion.ItemBody>
                                Targeting cookies are used by our advertising partners. 
                                They may be used to build a profile of your interests and show you relevant ads. 
                                They do not store personal information, but can uniquely identify your browser and device.
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                </Accordion.Root>
            </Drawer.Body>
            <Drawer.Footer>
                <Button variant="outline" colorPalette="orange" onClick={savePreferences}>
                    Save Preference
                </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
                <CloseButton size="lg" />
            </Drawer.CloseTrigger>
        </Drawer.Content>
    );
});