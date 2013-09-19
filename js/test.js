/**
 * This script contains ...
 */

(function () {
  function combineMatrix(a,b) {

    var reg = /((-?\d+)|(-?\d*\.\d+))(?=(,\s*)|\))/g;
    var aa = a.match(reg);
    var ba = b.match(reg);
    var result = [];
    for (var i=0; i < 12; i++) {
      result.push(aa[i] * ba[i]);
    }
    return "matrix3d(" + result.join() + ")";
    var am = $M([[aa[0],aa[1],aa[2],aa[3]],
      [aa[4],aa[5],aa[6],aa[7]],
      [aa[8],aa[9],aa[10],aa[11]],
      [aa[12],aa[13],aa[14],aa[15]]
    ]);
    var bm = $M([[ba[0],ba[1],ba[2],ba[3]],
      [ba[4],ba[5],ba[6],ba[7]],
      [ba[8],ba[9],ba[10],ba[11]],
      [ba[12],ba[13],ba[14],ba[15]]
    ]);
  }
  combineMatrix("matrix3d(0.904509, 0.309017, -0.293893, 0, 0.091844, 0.531824, 0.84186, 0, 0.416448, 0.788462, 0.452658, 0, 0, 0, 0, 1)",
    "matrix3d(0, 0, -0.293893, 0, 0.091844, 0.531824, 0.84186, 0, 0.416448, 0.788462, 0.452658, 0, 0, 0, 0, 2)");
})();