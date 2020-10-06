import $ from "jquery";

export default function getGeoCoding(params, setPostionInState) {
    var house = params.house
    var street = params.street
    var city = params.city
    if (checkIfAddressGood(params)) {
        /*
        console.log("params");
        console.log(params);
        */
        var latLng = [0, 0]
        const request = `https://nominatim.openstreetmap.org/search?q=${house}+${street},+${city}&format=xml&polygon_geojson=1&addressdetails=1`
        console.log(request);
        $.ajax(
            request, {
            dataType: "xml",
            success: function (data) {
                /*
                console.log("place");
                console.log($(data).find("place"));
                */
                latLng[0] = $(data).find("place").attr("lat")
                latLng[1] = $(data).find("place").attr("lon")
                /*
                console.log("latLng");
                console.log(latLng);*/
                if (latLng !== null && latLng[0] !== undefined && latLng[1] !== undefined) {
                    setPostionInState(latLng)
                }
            },
            error: function (xhr, status, error) {
                console.log("error");
                console.log(error);
            }

        })
    }
}

function checkIfAddressGood(params) {
    if (params.house !== "" && params.street !== "" && params.city !== "") {
        return true
    }
    return false
}