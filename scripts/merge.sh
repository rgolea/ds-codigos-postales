#!/bin/bash

sourceFolder=../archive
dataFolder=../data
output=codigos_postales

# Loop de todos los Shapefiles
firstFile=true
echo -e "\nHACIENDO MERGE"

for FILE in ../archive/*.zip # cycles through all files in directory
do
    tmp="${FILE%.*}";
    layer="${tmp##*-}"
    sql="select cast(ID_CP as int) as ID_CP,COD_POSTAL,ALTA_DB,geometry,cast(ID_CP / 10000000 as int) as CODIGO_INE from ${layer}"
    cmd="ogr2ogr  -f  'ESRI Shapefile'  ${dataFolder}/${output} -dialect SQLite  -sql '${sql}'  /vsizip/${FILE} -nln ${output}"
    echo "Haciendo merge de $layer"

    if [ "$firstFile" = true ]; then
        eval "${cmd}  -overwrite";
        firstFile=false
    else
        eval "${cmd}  -append";
    fi           
done

echo -e "\nGenerando CSV"
ogr2ogr -f csv ${dataFolder}/codigos_postales_municipios.csv -dialect SQLite -sql "SELECT  COD_POSTAL,CODIGO_INE from codigos_postales group by COD_POSTAL,CODIGO_INE" $dataFolder/$output

echo -e "\nConvirtiendo a GEOJSON"

# Convertir a GEOJSON
rm $dataFolder/$output.geojson # Borramos antes, -overwrite no parece funciona
ogr2ogr -overwrite -mapFieldType Date=String -f GeoJSON $dataFolder/$output.geojson $dataFolder/$output
# Borrar Shapefile
rm -rf $dataFolder/$output
echo -e "\nFinalizado"
