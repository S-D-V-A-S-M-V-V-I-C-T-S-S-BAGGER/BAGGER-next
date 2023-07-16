'use client'
import {FC, useEffect, useRef, useState} from 'react';

type Point = {
    x: number,
    y: number,
}

const maxDiscRadius = 50;
const minDiscRadius = 20;

function naivePoissonDiscs(height: number, width: number, discDiameter: number, maxNumberOfDiscs: number) {
    const points: Point[] = [];

    const maxRetries = 100;
    let tries = 0;

    const discDiameterSquared = discDiameter ** 2;
    const discRadius = discDiameter / 2;

    generatePoint: while (points.length < maxNumberOfDiscs) {
        const candidatePoint = {
            x: Math.random() * (width - discDiameter) + discRadius,
            y: Math.random() * (height - discDiameter) + discRadius,
        }

        for (const point of points) {
            const distanceSquared = (point.x - candidatePoint.x) ** 2 + (point.y - candidatePoint.y) ** 2;
            if (distanceSquared <= discDiameterSquared) {
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
        const radius = Math.random() * (maxDiscRadius - minDiscRadius) + minDiscRadius;
        return (
            <circle key={index} cx={point.x} cy={point.y} r={radius} fill="var(--aarde-bovenkant-bruin)"/>
        )
    })

    return (
        <svg ref={ref} className={'bubbeltjes-vlak'}>
            {circles}
        </svg>
    )
}

export default BubblesTest;
