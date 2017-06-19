#!/usr/bin/env bash

sourceFolder=../archive
dataFolder=../data
output=codigos_postales




merge=false
# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

while getopts "m" opt; do
    case "$opt" in
    m)
        merge=true
        ;;
    esac
done

echo "PROCESANDO SHAPEFILES A GEOJSON"

for FILE in ../archive/*.zip # cycles through all files in directory
do
    tmp="${FILE%.*}";
    layer="${tmp##*-}"
    echo "Convirtiendo $FILE"
    ogr2ogr -f "GEOJSON"  ../data/$layer.geojson \
        -dialect SQLite -sql "select *,cast(ID_CP / 10000000 as int) as CODIGO_INE from $layer" \
        -mapFieldType Date=String \
         /vsizip/$FILE
done


if [ "$merge" = true ] ; then
    ./merge.sh
fi

node update.js

exit
