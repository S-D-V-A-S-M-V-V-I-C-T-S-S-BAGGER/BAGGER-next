'use server';

import '../../components/turf/turf.css';
import React, {FC} from 'react';
import dynamic from "next/dynamic";
import AuthContextLoader from "@/components/auth/AuthContextLoader";
import Tally from "@/components/turf/Tally";

function renderClientSide<T extends FC>(component: T) {
    return dynamic(() => new Promise<T>(resolve => resolve(component)), { ssr: false });
}

export default async function Turf() {
    const DynamicTally = renderClientSide(Tally);
    return (<AuthContextLoader><DynamicTally/></AuthContextLoader>);
}
