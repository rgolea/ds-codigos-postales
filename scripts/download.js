/**
 * @fileOverview Crea shapefiles de codigos postales en formato ZIP a partir de los archivos que proporciona Cartociudad
 * @version 0.0.1
 */

var AdmZip = require('adm-zip');
var fs = require('fs');
var archiver = require('archiver');
var _ = require('underscore');
var async = require('async');
var request = require('request');
var glob = require("glob")

// Constantes
var BASEURL = 'http://centrodedescargas.cnig.es/CentroDescargas/downloadFile.do?seq=';
var SOURCES_FOLDER = '../archive/';
var fileList = _.range(9082, 9130).concat(_.range(42602, 42606));
var extensions = ['dbf','prj','shp','shx','cpg'];


// Elimina de la lista los archivos ya generados
glob(SOURCES_FOLDER + "*.zip",  {sync: true}).forEach(function(element){
  id = parseInt(element.split(SOURCES_FOLDER)[1].split("-")[0]);
  if ((index = fileList.indexOf(id)) > -1){
    fileList.splice(index, 1);
  }
})

// Descarga y procesa de forma concurrente hasta 5 archivos
async.mapLimit(fileList, 5, function(item, callback){
  console.log("Descargando " + BASEURL + item);
  request({url:BASEURL + item, encoding:null}, function (error, response, body) {
    saveProvince(error, body, item);
    callback(error,body);
  });
}, function(err, results){
  console.log('Terminado!');
});


/**
 * Procesa y graba a disco el shapefile en zip con los codigos postales
 * @param error
 * @param body
 * @param item
 */
function saveProvince(error,body,item){

  var archive = archiver('zip');
  var sourceZip = new AdmZip(body);
  var zipEntries = sourceZip.getEntries(); // an array of ZipEntry records

  zipEntries.some(function(zipEntry) {
    if (zipEntry.isDirectory) {
      provincia = zipEntry.entryName.split("CARTOCIUDAD_CALLEJERO_")[1].slice(0,-1);
      return true;
    }
  });

  var output = fs.createWriteStream(SOURCES_FOLDER + item + "-" + provincia + ".zip");
  console.log("Generado " + provincia + ".zip");
  archive.pipe(output);

  extensions.forEach(function(ext){
    entry = sourceZip.getEntry('CODIGO_POSTAL.' + ext);
    archive.append(entry.getData(), { name: provincia + "." + ext });
  });

  archive.finalize();
}