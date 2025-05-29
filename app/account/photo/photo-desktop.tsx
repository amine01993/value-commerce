"use client";

import Image from "next/image";
import { DragEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button, CloseButton, FileUpload, FileUploadFileChangeDetails, Heading, Input, InputGroup, Text } from "@chakra-ui/react";
import style from "./photo-desktop.module.scss";
import { clamp } from "@/utils/helpers";
import HiddenCanvas from "@/components/account/photo/desktop/hidden-canvas";
import placeholder from "@/public/photo-placeholder.jpg";


export default function PhotoDesktop() {

    const wrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const circleRadius = useRef(100);
    const prevScrollLeft = useRef(0);
    const prevScrollTop = useRef(0);
    const [image, setImage] = useState<null|string>(null);

    const handleFileChange = useCallback((details: FileUploadFileChangeDetails) => {

        const files = details.acceptedFiles
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

    const handleDragStart = useCallback(() => {
        disableScroll()
    }, []);

    const handleDrag = useCallback((event: DragEvent<HTMLDivElement>) => {
        const { x, y } = getCoords(event);

        if(maskRef.current) {
            maskRef.current.style.setProperty('--mask-x', x + 'px');
            maskRef.current.style.setProperty('--mask-y', y + 'px');
        }
    }, []);

    const handleDragEnd = useCallback((event: DragEvent<HTMLDivElement>) => {
                    
        const { x, y } = getCoords(event);
        if(maskRef.current) {
            maskRef.current.style.setProperty('--mask-x', x + 'px');
            maskRef.current.style.setProperty('--mask-y', y + 'px');
        }

        if(handleRef.current && wrapperRef.current) {
            handleRef.current.style.top = y - circleRadius.current + 'px';
            handleRef.current.style.left = x - circleRadius.current + 'px';
        }

        enableScroll()
        drawSelectedImage();
    }, []);

    const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    const handleScroll = useCallback(() => {
        if(wrapperRef.current && maskRef.current && handleRef.current) {

            const hDiff = parseInt(handleRef.current.style.left) - prevScrollLeft.current;
            const vDiff = parseInt(handleRef.current.style.top) - prevScrollTop.current;
            
            handleRef.current.style.left = hDiff + wrapperRef.current.scrollLeft + 'px';
            handleRef.current.style.top = vDiff + wrapperRef.current.scrollTop + 'px';
            
            maskRef.current.style.setProperty('--mask-x', hDiff + wrapperRef.current.scrollLeft + circleRadius.current + 'px');
            maskRef.current.style.setProperty('--mask-y', vDiff + wrapperRef.current.scrollTop + circleRadius.current + 'px');

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
            const ctx = canvasRef.current.getContext('2d');
    
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

    const getCoords = useCallback((event: DragEvent<HTMLDivElement>) => {

        let newX = 0, newY = 0;

        if(wrapperRef.current && imageRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            newX = event.clientX - rect.x;
            newY = event.clientY - rect.y;

            newX = clamp(circleRadius.current, newX, rect.width - circleRadius.current) + wrapperRef.current.scrollLeft;
            newY = clamp(circleRadius.current, newY, rect.height - circleRadius.current) + wrapperRef.current.scrollTop;
        }

        return {
            x: newX,
            y: newY,
        };
    }, []);

    const disableScroll = useCallback(() => {
        if(wrapperRef.current) {
            wrapperRef.current.style.overflow = 'hidden'
        }
    }, []);

    const enableScroll = useCallback(() => {
        if(wrapperRef.current) {
            wrapperRef.current.style.removeProperty('overflow')
        }
    }, []);

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
            
        if(wrapperRef.current && imageRef.current && maskRef.current && handleRef.current 
            && ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) {
            event.preventDefault();
            
            const styles = window.getComputedStyle(maskRef.current);

            let x = parseFloat(styles.getPropertyValue('--mask-x'));
            let y = parseFloat(styles.getPropertyValue('--mask-y'));

            if(event.key === "ArrowUp") {
                if(event.shiftKey) {
                    y -= 10;
                }
                if(event.altKey) {
                    y -= .1;
                }
                else {
                    y -= 1;
                }
            }
            else if(event.key === "ArrowDown") {
                if(event.shiftKey) {
                    y += 10;
                }
                if(event.altKey) {
                    y += .1;
                }
                else {
                    y += 1;
                }
            }
            else if(event.key === "ArrowLeft") {
                if(event.shiftKey) {
                    x -= 10;
                }
                if(event.altKey) {
                    x -= .1;
                }
                else {
                    x -= 1;
                }
            }
            else if(event.key === "ArrowRight") {
                if(event.shiftKey) {
                    x += 10;
                }
                if(event.altKey) {
                    x += .1;
                }
                else {
                    x += 1;
                }
            }

            const rect = wrapperRef.current.getBoundingClientRect();

            x = clamp(circleRadius.current, x, imageRef.current.width - circleRadius.current);
            y = clamp(circleRadius.current, y, imageRef.current.height - circleRadius.current);

            if(x < circleRadius.current + wrapperRef.current.scrollLeft) {
                wrapperRef.current.scrollBy({
                    left: x - (circleRadius.current + wrapperRef.current.scrollLeft),
                    behavior: 'instant',
                })
                prevScrollLeft.current = wrapperRef.current.scrollLeft;
            }
            else if(x > rect.width - circleRadius.current + wrapperRef.current.scrollLeft) {
                wrapperRef.current.scrollBy({
                    left: x - (rect.width - circleRadius.current + wrapperRef.current.scrollLeft),
                    behavior: 'instant',
                })
                prevScrollLeft.current = wrapperRef.current.scrollLeft;
            }

            if(y < circleRadius.current + wrapperRef.current.scrollTop) {
                wrapperRef.current.scrollBy({
                    top: y - (circleRadius.current + wrapperRef.current.scrollTop),
                    behavior: 'instant',
                })
                prevScrollTop.current = wrapperRef.current.scrollTop;
            }
            else if(y > rect.height - circleRadius.current + wrapperRef.current.scrollTop) {
                wrapperRef.current.scrollBy({
                    top: y - (rect.height - circleRadius.current + wrapperRef.current.scrollTop),
                    behavior: 'instant',
                })
                prevScrollTop.current = wrapperRef.current.scrollTop;
            }

            maskRef.current.style.setProperty('--mask-x', x + 'px');
            maskRef.current.style.setProperty('--mask-y', y + 'px');

            handleRef.current.style.left = x - circleRadius.current + 'px';
            handleRef.current.style.top = y - circleRadius.current + 'px';

            drawSelectedImage();
        }
    }, []);

    const onSave = useCallback(() => {
        if(canvasRef.current && imageRef.current) {
            console.log('onSave', canvasRef.current.toDataURL())
        }
    }, []);

    useEffect(() => {

        if(imageRef.current) {

            if(!imageRef.current.onload) {
                updateImageDimensions();
                imageRef.current.onload = () => {
                    updateImageDimensions();
                }
            }

            if(handleRef.current && maskRef.current && wrapperRef.current) {
                const rect = wrapperRef.current.getBoundingClientRect();
                
                maskRef.current.style.setProperty('--mask-x', rect.width / 2 + 'px');
                maskRef.current.style.setProperty('--mask-y', rect.height / 2 + 'px');
                maskRef.current.style.width = imageRef.current.width + 'px';
                maskRef.current.style.height = imageRef.current.height + 'px';
                
                handleRef.current.style.top = rect.height / 2 - circleRadius.current + 'px';
                handleRef.current.style.left = rect.width / 2 - circleRadius.current + 'px';

                prevScrollLeft.current = 0;
                prevScrollTop.current = 0;

                drawSelectedImage();
            }
        }

        return () => {
        }
    }, [image]);

    return (
        <main className={style.page}>
            <Heading as="h1">Photo</Heading>
            <Text className="description">Add a nice photo of yourself for your profile</Text>
            
            <div className="preview" onKeyDown={handleKeyDown} tabIndex={0}>
                <Text as="label" fontWeight="semibold" fontSize="sm">Image preview</Text>
                <div className="img-wrapper" ref={wrapperRef} 
                    onDragOver={handleDragOver} onScroll={handleScroll} onScrollEnd={handleScrollEnd}>
                    {image && (
                        <>
                        <img src={image} alt="Personal Photo" className="personal-img" ref={imageRef} />
                        <div className="masked-element" ref={maskRef}></div>
                        <div className="drag-handle" draggable="true" ref={handleRef}
                            onDragStart={handleDragStart} onDrag={handleDrag} onDragEnd={handleDragEnd}></div>
                        </>
                    )}
                    {!image && (
                        <Image src={placeholder} alt="Personal Photo Placeholder" height={200} className="placeholder-img" />
                    )}
                </div>
                <HiddenCanvas circleRadius={circleRadius.current} ref={canvasRef} />

                <FileUpload.Root gap="1" onFileChange={handleFileChange} accept={["image/*"]} maxFileSize={5242880}>
                    <FileUpload.HiddenInput />
                    <FileUpload.Label fontWeight="semibold" fontSize="sm">Add / Change Image</FileUpload.Label>
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
                            <Input placeholder="No file selected" asChild>
                                <FileUpload.Trigger>
                                    <FileUpload.FileText lineClamp={1} />
                                </FileUpload.Trigger>
                            </Input>

                        </InputGroup>

                        <FileUpload.Trigger asChild>
                            <Button colorPalette="orange" variant="outline">
                                Upload Image
                            </Button>
                        </FileUpload.Trigger>
                        
                    </div>

                    <Button colorPalette="orange" className="save-btn" onClick={onSave}>
                        Save
                    </Button>
                </FileUpload.Root>
            </div>
        </main>
    );
}