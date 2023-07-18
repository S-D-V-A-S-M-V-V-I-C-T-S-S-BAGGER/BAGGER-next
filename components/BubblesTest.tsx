'use client'
import {FC, useContext, useLayoutEffect, useRef, useState} from 'react';
import {HoleContext} from '@/components/logo/LogoMidden';

export type BubbleDef = {
    x: number,
    y: number,
    radius: number,
}

const densityMultiplier = 2.1;

function densityTest(point1: BubbleDef, point2: BubbleDef) {
    const distanceSquared = (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2;
    const minDistanceSquared = ((point1.radius + point2.radius) * densityMultiplier) ** 2;
    return distanceSquared < minDistanceSquared;
}

function holeDensityTest(hole: BubbleDef, point: BubbleDef) {
    const distanceSquared = (hole.x - point.x) ** 2 + (hole.y - point.y) ** 2;
    const minDistanceSquared = (hole.radius + point.radius * densityMultiplier) ** 2;
    return distanceSquared < minDistanceSquared;
}

function naivePoissonDiscs(height: number, width: number, maxNumberOfDiscs: number, minDiscRadius: number, maxDiscRadius: number, holes: BubbleDef[]) {
    const points: BubbleDef[] = [];

    const maxRetries = 100;
    let tries = 0;

    generatePoint: while (points.length < maxNumberOfDiscs) {
        const radius                    = Math.random() * (maxDiscRadius - minDiscRadius) + minDiscRadius;
        const candidatePoint: BubbleDef = {
            x: Math.random() * (width - (radius * 2)) + radius,
            y: Math.random() * (height - (radius * 2)) + radius,
            radius,
        }

        for (const hole of holes) {
            const tooClose = holeDensityTest(hole, candidatePoint);
            if (tooClose) {
                tries += 1;

                if (tries >= maxRetries) {
                    break generatePoint;
                } else {
                    continue generatePoint;
                }
            }
        }

        for (const point of points) {
            const tooClose = densityTest(point, candidatePoint);
            if (tooClose) {
                tries += 1;

                if (tries >= maxRetries) {
                    break generatePoint;
                } else {
                    continue generatePoint;
                }
            }
        }

        points.push(candidatePoint);
        tries = 0;
    }

    return points;
}

const BubblesTest: FC = () => {
    const ref = useRef<SVGSVGElement>(null);

    const {holes: holeDefinitions} = useContext(HoleContext);

    const [discPoints, setDiscPoints] = useState<BubbleDef[]>([])

    const [debugHoles, setDebugHoles] = useState<BubbleDef[]>([])

    useLayoutEffect(() => {
        const boundingClientRect = ref.current!.getBoundingClientRect();

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const wmin = Math.min(windowHeight, windowWidth);

        const maxDiscRadius = 50 * (wmin / 1080);
        const minDiscRadius = 20 * (wmin / 1080);

        const relativeHoles: BubbleDef[] = holeDefinitions.map((point: BubbleDef | null): (BubbleDef | null) => point ? ({
            x: point.x - boundingClientRect.x,
            y: point.y - boundingClientRect.y,
            radius: point.radius,
        }) : null).filter(point => point !== null) as unknown[] as BubbleDef[];

        // console.log(boundingClientRect);
        const points = naivePoissonDiscs(
            boundingClientRect.height,
            boundingClientRect.width,
            100,
            minDiscRadius,
            maxDiscRadius,
            relativeHoles,
        );
        console.log(points, holeDefinitions);
        setDiscPoints(points);
        setDebugHoles(relativeHoles);
    }, [
        ref.current?.getBoundingClientRect().width,
        ref.current?.getBoundingClientRect().height,
        holeDefinitions,
    ])

    // TODO debounced onwindowresize

    const circles = discPoints.map((point, index) => {
        return (
            <circle key={index} cx={point.x} cy={point.y} r={point.radius} fill="var(--aarde-bovenkant-bruin)"/>
        )
    })

    const debugHoleCircles = debugHoles.map((hole, index) => {
        return (
            <circle key={circles.length + index} cx={hole.x} cy={hole.y} r={hole.radius + 10} fill='red'/>
        )
    })

    return (
        <svg ref={ref} className={'bubbeltjes-vlak'}>
            {circles}
            {/*{debugHoleCircles}*/}
        </svg>
    )
}

export default BubblesTest;
