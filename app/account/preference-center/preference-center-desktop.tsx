"use client";

import { useCallback, useEffect, useState } from "react";
import { Heading, Text, Link as LinkUI, Switch, Separator, Button, SwitchCheckedChangeDetails, Drawer, Portal, DrawerOpenChangeDetails } from "@chakra-ui/react";
import { disableDocumentScroll, resetDocumentScroll } from "@/utils/common";
import style from "./preference-center-desktop.module.scss";
import CookiePreference from "@/components/account/preference-center/desktop/cookie-preference";


export default function PreferenceCenterDesktop() {

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

    useEffect(() => {
        if(openCookies) {
            disableDocumentScroll();
        }
        else {
            resetDocumentScroll();
        }
    }, [openCookies]);

    return (
        <main className={style.page}>
            <Heading as="h1">Preference Center</Heading>
            <Text fontSize="sm" textAlign="center">
                Update your preferences to personalize your experience with us. 
                Any personal information you provide will be handled according to our 
                <LinkUI variant="underline" colorPalette="blue" href="#">Privacy Policy</LinkUI>.
            </Text>
            
            <div className="preferences">
                <Heading as="h2" fontSize="md">Marketing Preferences</Heading>

                <div className="field">
                    <Switch.Root colorPalette="orange"
                        checked={newsletter} onCheckedChange={handleNewsletterChange}>
                        <Switch.HiddenInput />
                        <Switch.Label fontWeight="semibold">Weekly Newsletter</Switch.Label>
                        <Switch.Control />
                    </Switch.Root>
                    <Text fontSize="sm">
                        Each week we'll send you a round-up of our latest Top Deals and current sales events.
                    </Text>
                </div>

                <div className="field">
                    <Switch.Root colorPalette="orange"
                        checked={promotional} onCheckedChange={handlePromotionalChange}>
                        <Switch.HiddenInput />
                        <Switch.Label fontWeight="semibold">All other promotional emails</Switch.Label>
                        <Switch.Control />
                    </Switch.Root>
                    <Text fontSize="sm">
                        Never miss a thing – we'll send you more frequent updates about the hottest deals, coolest new products, and exclusive sales events.
                    </Text>
                </div>

                <Separator bgColor="gray.300" />

                <Heading as="h2" fontSize="md">Cookies</Heading>

                <Text fontSize="sm">Cookies are vital to enhancing site performance and delivering helpful, personalized content.</Text>
                
                <Drawer.Root size="md" placement="end"
                    open={openCookies} onOpenChange={handleCookieDrawer}>
                    <Drawer.Trigger asChild>
                        <Button colorPalette="orange" variant="outline">
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

                <Text className="note" fontSize="xs">
                    Please note: Cookie preferences are saved to the device and browser you're currently using. 
                    If you access Best Buy from a different device or browser in the future, you may be asked to update your preferences again.
                </Text>
            </div>
        </main>
    );
}