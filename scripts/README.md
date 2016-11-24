# Script

Descarga y procesa shapefiles de Cartociudad y extrae las geometrías de los códigos postales a un único archivo geojson.

## Modo de Uso

### Descarga

    $ node download.js

### Procesado
    
    $ node process.js

    
## Requisitos

* Node.js
* GDAL/OGR
  
La última versión de GDAL/OGR en UBUNTU se puede obtener de ppa:ubuntugis/ppa
   
    $ sudo add-apt-repository ppa:ubuntugis/ppa && sudo apt-get update     
    $ sudo apt-get install gdal-bin