import proj4 from 'proj4';

// Origin Point
const lon_0 = 35.20451694444444 // central_meridian
const lat_0 =  31.734393611111113 // latitude_of_origin
// False Origin
const y_0 = 626907.390 // false_northing
const x_0 = 219529.584 // false_easting
const k_0 = 1.0000067 // scale_factor

var ITM = `PROJCS["ITM", GEOGCS["ITM", DATUM["Isreal 1993", SPHEROID["GRS 1980", 6378137, 298.257222101, AUTHORITY["EPSG", "7019"]], TOWGS84[-24.0024, -17.1032, -17.8444, -0.33077, -1.85269, 1.66969, 5.4248]], PRIMEM["Greenwich", 0, AUTHORITY["EPSG", "8901"]], UNIT["degree", 0.017453292519943295, AUTHORITY["EPSG", "9102"]], AXIS["East", EAST], AXIS["North", NORTH]], UNIT["metre", 1, AUTHORITY["EPSG", "9001"]], PROJECTION["Transverse_Mercator"], PARAMETER["latitude_of_origin", ${lat_0}], PARAMETER["central_meridian", ${lon_0}], PARAMETER["false_northing", ${y_0}], PARAMETER["false_easting", ${x_0}], PARAMETER["scale_factor", ${k_0}], AXIS["East", EAST], AXIS["North", NORTH]]`
export default function ITMToWGS84(ITMCor=[210727,745742]) {
  //console.log(ITMCor);
  var WGS84FromITM = proj4(ITM /*from*/, 'WGS84' /*to*/ ,ITMCor)
  //console.log(WGS84FromITM);
  return WGS84FromITM
}