#!/bin/bash

IMAGE_NAME=bosted-mdb-image
CONTAINER_NAME=bosted-mdb
CONTAINER_EXISTS=$(docker ps -aq -f name="${CONTAINER_NAME}")

echo $CONTAINER_EXISTS

if [ "$CONTAINER_EXISTS" ]; then
    echo 'Already exists!'
else
    docker build -t $IMAGE_NAME .
    docker run --name $CONTAINER_NAME -p 3307:3306 -e MYSQL_ROOT_PASSWORD=toor -d $IMAGE_NAME
fi
