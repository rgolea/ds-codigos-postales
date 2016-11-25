#!/bin/bash

for FILE in ../archive/*.zip # cycles through all files in directory
do
    tmp="${FILE%.*}";
    layer="${tmp##*-}"
    echo "converting file: $FILE..."
    ogr2ogr -f "GEOJSON"  ../data/$layer.geojson \
        -dialect SQLite -sql "select *,cast(ID_CP / 10000000 as int) as CODIGO_INE from $layer" \
         /vsizip/$FILE

    node update.js
done
exit