# Script



Descarga y procesa shapefiles de Cartociudad y convierte las geometrías de los códigos postales a un archivo GEOJSON por provincia, con la opción de poder generar un único GEOJSON para toda España.

**Nota**: Desde primeros de 2017, los códigos postales ya no están incluidos en las descargas de Cartociudad del CNIG, por lo que el script de descarga no va a funcionar. Según se comenta, está información ya no está disponible por decisión del Grupo Correos.

## Modo de Uso

### Descarga

    $ node download.js

### Procesado
    
    $ ./process.sh [-m]

Si se inovoca sin argumentos, convierte los shapefiles de las provincias a sus correspondientes archivos GEOJSON.

Opciones
           
          -m     Hace un merge de todos los shapefiles individuales a un único shapefile y lo convierte a GEOJSON. 
                 También genera el CSV sin geometrías.                          
          
          

    
## Requisitos

* Node.js
* GDAL/OGR
  
La última versión de GDAL/OGR en UBUNTU se puede obtener de ppa:ubuntugis/ppa
   
    $ sudo add-apt-repository ppa:ubuntugis/ppa && sudo apt-get update     
    $ sudo apt-get install gdal-bin