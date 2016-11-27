/**
 * @fileOverview Actualiza datapackage.json
 * @version 0.0.1
 */

var dpinit = require('datapackage-init');
var semver = require("semver");
var fs = require('fs');


// Actualizamos/Creamos datapackage.json
dpinit.init("../", function (err, datapackageJson) {
  //Actualizamos fecha y semver
  var today = new Date();
  datapackageJson.last_updated = today.getFullYear() + "-" + ("00" + (today.getMonth() + 1)).slice(-2) + "-" + ("00" + today.getDate()).slice(-2);
  datapackageJson.version = semver.inc(datapackageJson.version, 'patch');

  //Grabamos a disco
  fs.writeFile("../datapackage.json", JSON.stringify(datapackageJson, null, 2));
  console.log('daptapackage.json updated.');

});