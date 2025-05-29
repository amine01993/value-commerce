"use client";

import Image from "next/image";
import { TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button, CloseButton, FileUpload, FileUploadFileChangeDetails, Heading, Input, InputGroup, Text } from "@chakra-ui/react";
import style from "./photo.module.scss";
import { clamp } from "@/utils/helpers";
import HiddenCanvas from "@/components/account/photo/hidden-canvas";
import placeholder from "@/public/photo-placeholder.jpg";

export default function Photo() {

    const wrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const circleRadius = useRef(100);
    const prevScrollLeft = useRef(0);
    const prevScrollTop = useRef(0);
    const lastTouchX = useRef(0);
    const lastTouchY = useRef(0);
    const [image, setImage] = useState<null|string>(null);

    const handleFileChange = useCallback((details: FileUploadFileChangeDetails) => {

        const files = details.acceptedFiles;
        if(files.length > 0) {
            const reader = new FileReader();

            reader.onloadend = function () {
                setImage(String(reader.result));
            };
            reader.readAsDataURL(files[0]);
        }
        else {
            setImage(null);
        }
    }, []);

    const handleTouchStart = useCallback(() => {
        disableScroll();
    }, []);

    const handleTouchMove = useCallback((event: TouchEvent<HTMLDivElement>) => {
        if(event.cancelable) event.preventDefault();

        const { x, y } = getTouchCoords(event);

        if(wrapperRef.current && maskRef.current) {
            maskRef.current.style.setProperty("--mask-x", wrapperRef.current.scrollLeft + x + "px");
            maskRef.current.style.setProperty("--mask-y", wrapperRef.current.scrollTop + y + "px");
        }

        lastTouchX.current = x;
        lastTouchY.current = y;
    }, []);

    const handleTouchEnd = useCallback(() => {
        
        if(handleRef.current && wrapperRef.current) {
            handleRef.current.style.top = wrapperRef.current.scrollTop + lastTouchY.current - circleRadius.current + "px";
            handleRef.current.style.left = wrapperRef.current.scrollLeft + lastTouchX.current - circleRadius.current + "px";
        }
        drawSelectedImage();
        enableScroll();
    }, []);

    const handleTouchCancel = useCallback(() => {
        
        if(handleRef.current && wrapperRef.current) {
            handleRef.current.style.top = wrapperRef.current.scrollTop + lastTouchY.current - circleRadius.current + "px";
            handleRef.current.style.left = wrapperRef.current.scrollLeft + lastTouchX.current - circleRadius.current + "px";
        }
        drawSelectedImage();
        enableScroll();
    }, []);

    const handleScroll = useCallback(() => {
        if(wrapperRef.current && maskRef.current && handleRef.current) {

            const hDiff = parseInt(handleRef.current.style.left) - prevScrollLeft.current;
            const vDiff = parseInt(handleRef.current.style.top) - prevScrollTop.current;
            
            handleRef.current.style.left = hDiff + wrapperRef.current.scrollLeft + "px";
            handleRef.current.style.top = vDiff + wrapperRef.current.scrollTop + "px";
            
            maskRef.current.style.setProperty("--mask-x", hDiff + wrapperRef.current.scrollLeft + circleRadius.current + "px");
            maskRef.current.style.setProperty("--mask-y", vDiff + wrapperRef.current.scrollTop + circleRadius.current + "px");

            prevScrollLeft.current = wrapperRef.current.scrollLeft;
            prevScrollTop.current = wrapperRef.current.scrollTop;
        }
    }, []);

    const handleScrollEnd = useCallback(() => {
        drawSelectedImage();
    }, []);

    const updateImageDimensions = useCallback(() => {
        
        if(wrapperRef.current && imageRef.current) {
            imageRef.current.style.height = "";
            imageRef.current.style.width = "";
            imageRef.current.style.minWidth = "";

            // original image dimensions
            const nw = imageRef.current.naturalWidth;
            const nh = imageRef.current.naturalHeight;

            // wrapper dimenstions
            const rect = wrapperRef.current.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            // set rendered image dimenstions
            if(nw / nh < w / h) {
                // vertical scroll
                const newHeight = nh / nw * w;
                imageRef.current.style.height = newHeight + "px";
            }
            else {
                // horizontal scroll
                const newWidth = nw / nh * h;
                imageRef.current.style.width = newWidth + "px";
                imageRef.current.style.minWidth = newWidth + "px";
            }
        }
    }, []);

    const drawSelectedImage = useCallback(() => {

        if(canvasRef.current && wrapperRef.current && imageRef.current && handleRef.current) {
            const ctx = canvasRef.current.getContext("2d");
    
            if(ctx) {
                ctx.drawImage(
                    imageRef.current,
                    -parseFloat(handleRef.current.style.left),
                    -parseFloat(handleRef.current.style.top),
                    imageRef.current.width,
                    imageRef.current.height
                );
            }
        }

    }, []);

    const getTouchCoords = useCallback((event: TouchEvent) => {

        let newX = 0, newY = 0;

        if(wrapperRef.current && imageRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            const touch = event.touches[0];
            newX = touch.clientX - rect.x;
            newY = touch.clientY - rect.y;

            newX = clamp(circleRadius.current, newX, rect.width - circleRadius.current);
            newY = clamp(circleRadius.current, newY, rect.height - circleRadius.current);
        }

        return {
            x: newX,
            y: newY,
        };
    }, []);

    const disableScroll = useCallback(() => {
        if(wrapperRef.current) {
            wrapperRef.current.style.overflow = "hidden";
        }
    }, []);

    const enableScroll = useCallback(() => {
        if(wrapperRef.current) {
            wrapperRef.current.style.removeProperty("overflow");
        }
    }, []);

    const onSave = useCallback(() => {
        if(canvasRef.current && imageRef.current) {
            console.log("onSave", canvasRef.current.toDataURL());
        }
    }, []);

    useEffect(() => {

        if(imageRef.current) {

            if(!imageRef.current.onload) {
                updateImageDimensions();
                imageRef.current.onload = () => {
                    updateImageDimensions();
                };
            }

            if(handleRef.current && maskRef.current && wrapperRef.current) {
                const rect = wrapperRef.current.getBoundingClientRect();
                
                maskRef.current.style.setProperty("--mask-x", rect.width / 2 + "px");
                maskRef.current.style.setProperty("--mask-y", rect.height / 2 + "px");
                maskRef.current.style.width = imageRef.current.width + "px";
                maskRef.current.style.height = imageRef.current.height + "px";
                
                handleRef.current.style.top = rect.height / 2 - circleRadius.current + "px";
                handleRef.current.style.left = rect.width / 2 - circleRadius.current + "px";
                
                prevScrollLeft.current = 0;
                prevScrollTop.current = 0;

                drawSelectedImage();
            }
        }

        return () => {
        };
    }, [image]);

    return (
        <main className={style.page}>
            <Heading as="h1">Photo</Heading>
            <Text>Add a nice photo of yourself for your profile</Text>
            
            <div className="preview">
                <Text as="label" fontWeight="semibold">Image preview</Text>
                <div className="img-wrapper" ref={wrapperRef} onScroll={handleScroll} onScrollEnd={handleScrollEnd}>
                    {image && (
                        <>
                            <img src={image} alt="Personal Photo" className="personal-img" ref={imageRef} />
                            <div className="masked-element" ref={maskRef}></div>
                            <div className="drag-handle" draggable="false" ref={handleRef}
                                onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onTouchCancel={handleTouchCancel}></div>
                        </>
                    )}
                    {!image && (
                        <Image src={placeholder} alt="Personal Photo Placeholder" height={200} className="placeholder-img" />
                    )}
                </div>
                <HiddenCanvas circleRadius={circleRadius.current} ref={canvasRef} />

                <FileUpload.Root gap="1" onFileChange={handleFileChange} accept={["image/*"]} maxFileSize={5242880}>
                    <FileUpload.HiddenInput />
                    <FileUpload.Label fontWeight="semibold" fontSize="md">Add / Change Image</FileUpload.Label>
                    <div className="input-group">
                        <InputGroup
                            endElement={
                                <FileUpload.ClearTrigger asChild>
                                    <CloseButton
                                        me="-1"
                                        size="xs"
                                        variant="plain"
                                        focusVisibleRing="inside"
                                        focusRingWidth="2px"
                                        pointerEvents="auto"
                                    />
                                </FileUpload.ClearTrigger>
                            }
                        >
                            <Input placeholder="No file selected" size="lg" asChild>
                                <FileUpload.Trigger>
                                    <FileUpload.FileText lineClamp={1} />
                                </FileUpload.Trigger>
                            </Input>

                        </InputGroup>

                        <FileUpload.Trigger asChild>
                            <Button colorPalette="orange" variant="outline" size="lg">
                                Upload Image
                            </Button>
                        </FileUpload.Trigger>
                        
                    </div>

                    <Button colorPalette="orange" size="lg" className="save-btn" onClick={onSave}>
                        Save
                    </Button>
                </FileUpload.Root>
            </div>
        </main>
    );
}
