# ds-codigos-postales

Relación de códigos postales de toda España junto el código INE del municipio al que pertencen. Se incluen también las 
geometrías asociadas a cada código postal en formato .geojson.


## Codigos Postales

- Fuente: Centro Nacional de Información Geográfica (CNIG) 
- URL: http://centrodedescargas.cnig.es/CentroDescargas/buscadorCatalogo.do?codFamilia=02122
- Tipo: Shapefile  
- Datos procesados: [/data/codigos_postales_municipio.csv](data/codigos_postales_municipios_join.csv) 
 
Este recurso ofrece un listado de todos los códigos postales junto con el código INE del municipio asociado. 



## Geometrías de los Códigos Postales

- Fuente: Centro Nacional de Información Geográfica (CNIG) 
- URL: http://centrodedescargas.cnig.es/CentroDescargas/buscadorCatalogo.do?codFamilia=02122
- Tipo: Shapefile  
- Datos procesados: [/data/](data/) 

Recurso que proporciona las geometrías de todos los códigos postales de España. Se incluyen en archivos separados que se corresponden con las provincias a las que pertenecen. 

Se ha optado por archivos independientes debido a que el archivo geojson unificado ocupa unos 160 Mb, lo que supera el límite permitido por GitHub. Sin embargo, sí que se incluye un Shapefile unificado de todos los códigos postales en [/data/codigos_postales](data/codigos_postales) (64 Mb).  


### Consideraciones acerca de la fiabilidad de estos datos 

* Hay un elevado número de [códigos postales incluidos en este dataset que no aparecen en el dataset ds-codigos-postales-ine](https://gist.github.com/inigoflores/07bdfbaaa115873dfb9cd5dfe6d8c239).
* También se produce la situación inversa, [en ds-codigos-postales-ine aparecen códigos postales que no están incluidos en este dataset](https://gist.github.com/inigoflores/12cc80aef4926572d5cf859cc0c7483d). 


### Algunas curiosidades

* Hay códigos postales que abarcan multitud de municipios, como es el caso del [código postal de Burgos 09640](https://gist.github.com/inigoflores/8ac5df78afb73424d45957866287e534).
* Hay códigos postales que incluyen un gran número de poligonos aunque solo hagan referencia a un único municipio, como sucede con el [código postal de Xàtiva 46800](https://gist.github.com/inigoflores/09e4c74de9bd82c09424bfa836de2af3).


## Script

El script se puede encontrar en [/scripts/](/scripts/).
  