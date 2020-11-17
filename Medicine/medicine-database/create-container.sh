#!/bin/bash

IMAGE_NAME=medicine-mdb-image
CONTAINER_NAME=medicine-mdb
CONTAINER_EXISTS=$(docker ps -aq -f name="${CONTAINER_NAME}")

if [ "$CONTAINER_EXISTS" ]; then
    echo 'Already exists!'
else
    docker build -t $IMAGE_NAME .
    docker run --name $CONTAINER_NAME -p 3308:3306 -e MYSQL_ROOT_PASSWORD=toor -d $IMAGE_NAME
fi
