'use server';

import '../../components/turf/turf.css';
import React from 'react';
import dynamic from "next/dynamic";
import AuthContextLoader from "@/components/auth/AuthContextLoader";

export default async function Turf() {
    const Tally = dynamic(() => import('@/components/turf/Tally'), { ssr: false });
    return (<AuthContextLoader><Tally pilsPrijs={parseInt(process.env.PILS_PRIJS!)}/></AuthContextLoader>);
}
