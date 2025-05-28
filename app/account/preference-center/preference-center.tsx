"use client";

import { useCallback, useState } from "react";
import { Heading, Text, Link as LinkUI, Switch, Separator, Button, SwitchCheckedChangeDetails, Drawer, Portal, DrawerOpenChangeDetails } from "@chakra-ui/react";
import style from "./preference-center.module.scss";
import CookiePreference from "./cookie-preference";

export default function PreferenceCenter() {

    const [newsletter, setNewsletter] = useState(false);
    const [promotional, setPromotional] = useState(false);

    const [openCookies, setOpenCookies] = useState(false);

    const handleNewsletterChange = useCallback((details: SwitchCheckedChangeDetails) => {
        setNewsletter(details.checked);
    }, []);

    const handlePromotionalChange = useCallback((details: SwitchCheckedChangeDetails) => {
        setPromotional(details.checked);
    }, []);

    const handleCookieDrawer = useCallback((details: DrawerOpenChangeDetails) => {
        setOpenCookies(details.open);
    }, []);

    return (
        <main className={style.page}>
            <Heading as="h1">Preference Center</Heading>
            <Text>
                Update your preferences to personalize your experience with us. 
                Any personal information you provide will be handled according to our 
                <LinkUI variant="underline" colorPalette="blue" href="#">Privacy Policy</LinkUI>.
            </Text>
            
            <div className="preferences">
                <Heading as="h2">Marketing Preferences</Heading>

                <div className="field">
                    <Switch.Root size="lg" colorPalette="orange"
                        checked={newsletter} onCheckedChange={handleNewsletterChange}>
                        <Switch.HiddenInput />
                        <Switch.Label fontSize="md" fontWeight="semibold">Weekly Newsletter</Switch.Label>
                        <Switch.Control />
                    </Switch.Root>
                    <Text>
                        Each week we'll send you a round-up of our latest Top Deals and current sales events.
                    </Text>
                </div>

                <div className="field">
                    <Switch.Root size="lg" colorPalette="orange"
                        checked={promotional} onCheckedChange={handlePromotionalChange}>
                        <Switch.HiddenInput />
                        <Switch.Label fontSize="md" fontWeight="semibold">All other promotional emails</Switch.Label>
                        <Switch.Control />
                    </Switch.Root>
                    <Text>
                        Never miss a thing – we'll send you more frequent updates about the hottest deals, coolest new products, and exclusive sales events.
                    </Text>
                </div>

                <Separator bgColor="gray.300" />

                <Heading as="h2">Cookies</Heading>

                <Text>Cookies are vital to enhancing site performance and delivering helpful, personalized content.</Text>
                
                <Drawer.Root size="full" placement="bottom"
                    open={openCookies} onOpenChange={handleCookieDrawer}>
                    <Drawer.Trigger asChild>
                        <Button size="lg" colorPalette="orange" variant="outline">
                            Manage Preferences
                        </Button>
                    </Drawer.Trigger>
                    <Portal>
                        <Drawer.Backdrop />
                        <Drawer.Positioner>
                            <CookiePreference setOpenCookies={setOpenCookies} />
                        </Drawer.Positioner>
                    </Portal>
                </Drawer.Root>

                <Text className="note" fontSize="sm">
                    Please note: Cookie preferences are saved to the device and browser you're currently using. 
                    If you access Best Buy from a different device or browser in the future, you may be asked to update your preferences again.
                </Text>
            </div>
            
        </main>
    );
}

