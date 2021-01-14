#!/bin/sh

# if [ "$TRAVIS_BRANCH" != 'dev' ]; then 
#     exit 0;
# fi

##########################
#####      AUTH      #####
##########################
auth_url=http://46.101.172.215:7000/api
echo $auth_url

login_payload=integration/login.json
register_payload=integration/register.json

echo "\n\n** Register **"
curl -X POST -H "Content-Type: application/json" -d @$register_payload ${auth_url}/register

echo "\n\n** Login **"
curl -X POST -H "Content-Type: application/json" -d @$login_payload ${auth_url}/login
echo "\n\n** Get User **"
curl -X GET ${auth_url}/users/username/kk

