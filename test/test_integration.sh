#!/bin/sh

# if [ "$TRAVIS_BRANCH" != 'dev' ]; then 
#     exit 0;
# fi

##########################
#####      AUTH      #####
##########################
url=http://localhost:7000/api/register
echo $url

register_payload=integration/register.json
echo $register_payload
curl -X POST -H "Content-Type: application/json" -d @$register_payload $url