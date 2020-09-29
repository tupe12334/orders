import $ from "jquery";
import xml2js from 'xml2js';
import X2JS from 'x2js';


//import fs from 'fs'
const fs = require('fs')

const GovURL = "https://data.gov.il/dataset/d2581732-eca4-4988-b986-df8e791a1d60/resource/d04feead-6431-427f-81bc-d6a24151c1fb/download/d04feead-6431-427f-81bc-d6a24151c1fb.xml"
var StreetsList = []
var totalList = []
$.ajax(
    GovURL, {
    dataType: "xml", success: function (data) {
        //console.log(data);
        var counter = 0;
        $(data)
        var x2js = new X2JS();
        //console.log(x2js);
        var document = x2js.xml2js(data);
        console.log(document);
        var parser = new xml2js.Parser();
        console.log();
        parser.parseString(data.toString(), function (err, result) {
            console.log(result);
            console.log('Done');
        });
        //console.log($(this));
        //console.log(city);
        //const cityNameOBJ = city.find("שם_ישוב")
        //console.log(cityNameOBJ[0].textContent);
        // cityList.push(cityNameOBJ[0].textContent)
    }
})

console.log(StreetsList);
export default StreetsList;