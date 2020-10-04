import $ from "jquery";

export default function getStreets(city, setArrayInState, params) {
    if (city !== "") {
        const action = "datastore_search"
        const test = "https://data.gov.il/api/3/action/datastore_search"
        var data = {
            resource_id: 'a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3', // the resource id
            limit: 3200, // get 5 results
            q: city, // query for 'jones'
            fields: "שם_ישוב,שם_רחוב",
            sort: "שם_רחוב"
        };
        var StreetsList = new Array()
        //console.log(StreetsList);
        //console.log("typeof array "+typeof (StreetsList));
        var totalList = []
        const request = `https://data.gov.il/api/3/action/${action}`
        $.ajax({
            url: request,
            data: data,
            dataType: 'json',
            success: function (data) {
                var streets = $(data.result)[0].records
                /*
                console.log("from api");
                console.log($(data.result)[0].records);
                */
                var counter = 1
                streets.forEach(street => {
                    if (city.includes(street.שם_ישוב.trim())) {
                        StreetsList.push(street.שם_רחוב.trim())
                        counter++
                    }
                });
                if (StreetsList) {
                    /*console.log("street");
                    console.log(StreetsList);
                    console.log(typeof (StreetsList));
                    console.log(StreetsList.length);*/
                    setArrayInState(StreetsList)
                }
            }
        })
    }
}