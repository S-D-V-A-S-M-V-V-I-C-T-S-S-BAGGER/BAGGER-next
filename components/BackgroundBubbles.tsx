'use client';
import {FC, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {HoleContext} from '@/components/logo/Logo';

type BubbleTestProps = {
    seed: number,
}

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

function hashCode(str: string) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function random(seed: string, offset: number) {
    return (hashCode(`${seed}:${offset}`) / 0xFFFFFFFF + 1.0) % 1.0;
}

function naivePoissonDiscs(height: number, width: number, maxNumberOfDiscs: number, minDiscRadius: number, maxDiscRadius: number, holes: BubbleDef[], seed: number) {
    const points: BubbleDef[] = [];

    const maxRetries = 100;
    let tries = 0;

    const seedString = `${height}:${width}:${seed}`;
    let randomizer = random(seedString, 0);

    generatePoint: while (points.length < maxNumberOfDiscs) {
        randomizer = random(seedString, randomizer);
        const random0 = randomizer;
        randomizer = random(seedString, randomizer);
        const random1 = randomizer;
        randomizer = random(seedString, randomizer);
        const random2 = randomizer;

        const radius                    = random0 * (maxDiscRadius - minDiscRadius) + minDiscRadius;
        const candidatePoint: BubbleDef = {
            x: random1 * (width - (radius * 2)) + radius,
            y: random2 * (height - (radius * 2)) + radius,
            radius,
        };

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

const BackgroundBubbles: FC<BubbleTestProps> = ({seed}) => {
    const ref = useRef<SVGSVGElement>(null);

    const [firstPass, setFirstPass] = useState(true);

    const {holeRefs} = useContext(HoleContext);

    const [discPoints, setDiscPoints] = useState<BubbleDef[]>([]);

    const [debugHoles, setDebugHoles] = useState<BubbleDef[]>([]);

    const drawBubbles = useCallback(() => {
        const boundingClientRect = ref.current!.getBoundingClientRect();

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const wmin = Math.min(windowHeight, windowWidth);

        const maxDiscRadius = 50 * (wmin / 1080);
        const minDiscRadius = 20 * (wmin / 1080);

        const relativeHoles = holeRefs.map((ref) => {
            if (ref && ref.current) {
                const holeRect = ref.current.getBoundingClientRect();
                const circle: BubbleDef = {
                    x: holeRect.right - (holeRect.width / 2) - boundingClientRect.x,
                    y: holeRect.bottom - (holeRect.height / 2) - boundingClientRect.y,
                    radius: holeRect.width / 2,
                };
                return circle;
            } else {
                return null;
            }
        }).filter(point => point !== null) as unknown as BubbleDef[];

        const points = naivePoissonDiscs(
            boundingClientRect.height,
            boundingClientRect.width,
            100,
            minDiscRadius,
            maxDiscRadius,
            relativeHoles,
            seed,
        );
        console.log(points, relativeHoles);
        setDiscPoints(points);
        setDebugHoles(relativeHoles);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            drawBubbles();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setFirstPass(false);
    }, []);

    useEffect(() => {
        if (!firstPass) {
            drawBubbles();
        }
    }, [firstPass]);

    const circles = discPoints.map((point, index) => {
        return (
            <circle key={index} cx={point.x} cy={point.y} r={point.radius} fill="var(--aarde-bovenkant-bruin)"/>
        );
    });

    const _debugHoleCircles = debugHoles.map((hole, index) => {
        return (
            <circle key={circles.length + index} cx={hole.x} cy={hole.y} r={hole.radius + 10} fill="red"/>
        );
    });

    return (
        <svg ref={ref} className={'bubbeltjes-vlak'}>
            {circles}
            {/*{_debugHoleCircles}*/}
        </svg>
    );
};

export default BackgroundBubbles;
