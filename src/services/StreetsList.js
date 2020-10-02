import $ from "jquery";

export default function getStreets(city, params) {
    if (city !== "") {
        const action = "datastore_search"
        const test = "https://data.gov.il/api/3/action/datastore_search"
        var data = {
            resource_id: 'a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3', // the resource id
            limit: 3200, // get 5 results
            q: city, // query for 'jones'
            fields: "שם_ישוב,שם_רחוב"
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
                //console.log($(data.result)[0].records);
                var counter = 1
                streets.forEach(street => {
                    /*
                     console.log(street.שם_ישוב);
                     console.log("city: ");
                     console.log(city);
                     */
                    if (city.includes(street.שם_ישוב)) {
                        StreetsList.push(street.שם_רחוב)
                        counter++
                    }
                });
                /*
                console.log(counter);
                StreetsList.length = counter
                console.log(StreetsList);
                */
            }
        })
        if (StreetsList) {
            /*
                        console.log("street");
                        console.log(StreetsList);
                        console.log(typeof (StreetsList));
            */
            return (
                StreetsList
            )
        }
    }


}


export async function getStreetsFromAutoCom(city) {
    console.log("enter getStreetsFromAutoCom");
    var streetList
    var p = new Promise((resolve, reject) => {
        console.log("enter promise");
        return resolve(getStreets(city))
    })
    var streetList = await p
    //var streetList = await promise
    console.log("promise result 2");
    console.log(streetList);


    var p2 = new Promise((resolve, reject) => {
        console.log("enter promise streetListO");
        var t = []
        var counter = 0
        //console.log(streetList);
        streetList.forEach(element => {
            console.log(counter++);
        });
        var t = streetList.map((option) => {
            const firstLetter = option[0].toUpperCase();
            return {
                firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                title: option
            };
        });
        return resolve(t)
    })
    var streetListO = await p2

    console.log("t");
    console.log(streetListO);
    return (streetListO)
}

