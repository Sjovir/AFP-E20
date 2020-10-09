#!/bin/bash

SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")

docker run --rm -p 80:8080 -e BASE_URL=/swagger -e SWAGGER_JSON=/custom/swagger.json -v $SCRIPTPATH:/custom swaggerapi/swagger-ui