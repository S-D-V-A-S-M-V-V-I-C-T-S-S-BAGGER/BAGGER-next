'use server';

import '../../components/turf/turf.css';
import React from 'react';
import Tally from '@/components/turf/Tally';

export default async function Turf() {
    return (<Tally pilsPrijs={parseInt(process.env.PILS_PRIJS!)}/>);
}
