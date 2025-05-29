import { memo, RefObject, useEffect } from "react";


interface HiddenCanvasType {
    ref: RefObject<HTMLCanvasElement|null>;
    circleRadius: number;
}

export default memo(function HiddenCanvas({ref, circleRadius}: HiddenCanvasType) {

    useEffect(() => {
        if(ref.current) {
            const ctx = ref.current.getContext("2d");
            if(ctx) {
                ctx.clearRect(0, 0, ref.current.width, ref.current.height);

                ctx.beginPath();
                ctx.arc(circleRadius, circleRadius, circleRadius, 0, 2 * Math.PI);
                ctx.clip();
            }
        }
    }, []);

    return (
        <canvas ref={ref} width="200" height="200"></canvas>
    );
});