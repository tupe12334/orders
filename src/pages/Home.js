import React from 'react';
import ITMToWGS84 from '../services/ITMToWGS84';
import getGeoCode from '../services/GovMaps';

export default function Home() {
    ITMToWGS84([211080,745685])
    getGeoCode()
    return (
        <div>
            home
        </div>
    )
}