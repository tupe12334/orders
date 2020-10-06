import { govmap } from './GovMapsAPI';

export default function getGeoCode() {
    console.log("enter");
    govmap.geocode({ keyword: 'הרוקמים', type: govmap.geocodeType.AccuracyOnly }
    ).then(function (response) {
        console.log(response)
    });
}