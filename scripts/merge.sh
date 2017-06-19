#!/bin/bash

sourceFolder=../archive
dataFolder=../data
output=codigos_postales
outputCSV=codigos_postales_municipios.csv
outputJoinCSV=codigos_postales_municipios_join.csv

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
ogr2ogr -f csv ${dataFolder}/$outputCSV -dialect SQLite -sql "SELECT  COD_POSTAL as codigo_postal,CODIGO_INE as municipio_id from codigos_postales group by codigo_postal,municipio_id" $dataFolder/$output

echo -e "\nHaciendo Join con ds-organizacion-administrativa para obtener los nombres de municipio\n"
curl https://raw.githubusercontent.com/codeforspain/ds-organizacion-administrativa/master/data/municipios.csv | \
csvcut -c 'municipio_id,nombre' | \
csvjoin -c "municipio_id" $dataFolder/codigos_postales_municipios.csv - | \
csvcut -C "municipio_id" > $dataFolder/$outputJoinCSV

echo -e "\nConvirtiendo a GEOJSON"

# Convertir a GEOJSON
rm $dataFolder/$output.geojson # Borramos antes, -overwrite no parece funcionar
ogr2ogr -overwrite -mapFieldType Date=String -f GeoJSON $dataFolder/$output.geojson $dataFolder/$output
# Borrar Shapefile
# rm -rf $dataFolder/$output
echo -e "\nFinalizado"
