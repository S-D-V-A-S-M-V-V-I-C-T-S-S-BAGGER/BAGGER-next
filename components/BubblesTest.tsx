'use client'
import {FC, useEffect, useRef, useState} from 'react';

type Point = {
    x: number,
    y: number,
    radius: number,
}

const maxDiscRadius = 50;
const minDiscRadius = 20;
const densityMultiplier = 2.1;

function densityTest(point1: Point, point2: Point) {
    const distanceSquared = (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2;
    const minDistanceSquared = ((point1.radius + point2.radius) * densityMultiplier) ** 2;
    return distanceSquared < minDistanceSquared;
}

function naivePoissonDiscs(height: number, width: number, discDiameter: number, maxNumberOfDiscs: number) {
    const points: Point[] = [];

    const maxRetries = 100;
    let tries = 0;

    const discDiameterSquared = discDiameter ** 2;
    const discRadius = discDiameter / 2;

    generatePoint: while (points.length < maxNumberOfDiscs) {
        const candidatePoint: Point = {
            x: Math.random() * (width - discDiameter) + discRadius,
            y: Math.random() * (height - discDiameter) + discRadius,
            radius: Math.random() * (maxDiscRadius - minDiscRadius) + minDiscRadius,
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

    const [discPoints, setDiscPoints] = useState<Point[]>([])

    useEffect(() => {
        const boundingClientRect = ref.current!.getBoundingClientRect();
        console.log(boundingClientRect);
        const points = naivePoissonDiscs(boundingClientRect.height, boundingClientRect.width, maxDiscRadius * 3, 100);
        console.log(points);
        setDiscPoints(points);
    }, [
        ref.current?.getBoundingClientRect().width,
        ref.current?.getBoundingClientRect().height,
    ])

    // TODO debounced onwindowresize

    const circles = discPoints.map((point, index) => {
        return (
            <circle key={index} cx={point.x} cy={point.y} r={point.radius} fill="var(--aarde-bovenkant-bruin)"/>
        )
    })

    return (
        <svg ref={ref} className={'bubbeltjes-vlak'}>
            {circles}
        </svg>
    )
}

export default BubblesTest;
