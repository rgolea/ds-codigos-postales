#!/bin/bash

for FILE in ../archive/*.zip # cycles through all files in directory
do
    echo "converting file: $FILE..."
    FILENEW=`echo $FILE | sed "s/.zip/.geojson/g;s/archive/data\/provincias/g;"` # replaces old filename
    ogr2ogr \
    -f "GEOJSON" \
        $FILENEW /vsizip/$FILE
done
exit