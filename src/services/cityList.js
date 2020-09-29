import $ from "jquery";

const GovURL = "https://data.gov.il/dataset/3fc54b81-25b3-4ac7-87db-248c3e1602de/resource/72bd51be-512b-4430-b2d2-f3295c90e569/download/72bd51be-512b-4430-b2d2-f3295c90e569.xml"
var cityList = []

$.ajax(
    GovURL,{
        dataType:"xml", success:function (data) {
            $(data)
            .find("ROW")
            .each(function(){
                const city = $(this)
                const cityNameOBJ = city.find("שם_ישוב")
                //console.log(cityNameOBJ[0].textContent);
                cityList.push(cityNameOBJ[0].textContent)
            })
        }
    }
)
//console.log(cityList);
export default cityList;