/**
 * @fileOverview Procesa shapefiles de códigos postales en formato ZIP descargados de Cartociudad
 * @version 0.0.1
 */

var fs = require('fs');
var glob = require("glob")
var ogr2ogr = require('ogr2ogr');
var events = require('events');

var SOURCES_FOLDER = '../archive/';
var DEST_FILE = '../data/codigos_postales.geojson';
var separator = ""; //valor inicial

var eventHandler = new events.EventEmitter();
var outfile = fs.createWriteStream(DEST_FILE);

var zlib = require('zlib');

/**
 * Procesa fichero zip y graba json
 *
 * @param {string} fileName Ruta completa del fichero zip
 * @param {callback} +
 */
function parseZip(fileName, callback) {
  ogr2ogr(fileName).exec(function (er, data) {
    if (er) return callback(err)
    eventHandler.emit('process',data.features);
    callback(null,data);
  })
}


/**
 * Itera el array de ficheros y los procesa. La recursividad es para que se ejecuten de forma síncrona
 *
 * @param {array} files array de nombre de fichero zip, ruta incluida
 */
function parse(files) {
  if (files.length == 0) return eventHandler.emit('end');
  parseZip(files.shift(), function (err, content) {
    parse(files);
  });
}

function createGzip(){


}

// Procesa nuevo grupo de geometrías, añade el código INE y graba a disco
eventHandler.on('process',function(data){
  data.forEach(function(item){
    item.properties.CODIGO_INE=String("000000000000" + item.properties.ID_CP).slice(5);
    outfile.write(separator + "\n" + JSON.stringify(item) )//, null, '\t'));
    if (separator == "") separator = ",";
  })
});


// Cierra el geojson y actualiza datapackage.json
eventHandler.on('end',function(){
  outfile.write('\n]}');

  // TEMPORAL - Borra el json y crea un gzip menor de 100 Mb (limitación Github)
  const gzip = zlib.createGzip();
  const inp = fs.createReadStream(DEST_FILE);
  const out = fs.createWriteStream(DEST_FILE + '.gz');
  inp.pipe(gzip).pipe(out);
  fs.unlinkSync(DEST_FILE);


  /* // Actualizamos datapackage.json - Desactivado por el gzip
  var exec = require('child_process').exec;
  var cmd = 'node update.js';
  exec(cmd, function(error, stdout, stderr) {});
  */

  console.log('Done!');


});


// Genera lista de nombres de ficheros ZIPs
var files = glob(SOURCES_FOLDER + "*.zip",  {sync: true});

// Graba cabecero del archivo geojson
outfile.write('{\n"type":"FeatureCollection",\n"features":[');

//Procesa array de ficheros
parse(files);