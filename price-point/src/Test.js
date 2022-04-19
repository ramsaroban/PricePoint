import * as turf from "@turf/turf";
function Inside(polygon, point) {
  //   var point = turf.point([-75.343, 39.984]);
  var point1 = turf.point([point[1], point[0]]);
  // here first is lng and then lat
  var po = [];
  for (var i = 0; i < polygon.length - 1; i++) {
    po.push([polygon[i][1], polygon[i][0]]);
  }
  po.push([polygon[0][1], polygon[0][0]]);

  var polygon1 = turf.polygon([po], { name: "poly1" });

  return turf.inside(point1, polygon1);
}

export default Inside;
