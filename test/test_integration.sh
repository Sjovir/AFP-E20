#!/bin/sh

# if [ "$TRAVIS_BRANCH" != 'dev' ]; then 
#     exit 0;
# fi

log_failure() {
  printf "${RED}✖ %s${NORMAL}\n" "$@" >&2
}

assert_eq() {
  local expected="$1"
  local actual="$2"
  local msg="${3-}"
  if [ "$expected" = "$actual" ]; then
    echo 0
    return 0
  else
    [ "${#msg}" -gt 0 ] && log_failure "$expected = $actual :: $msg" || true
    echo 1
    return 1
  fi
}

clean_up() {
    curl -X DELETE -H "Content-Type: application/json" -d @$register_payload ${auth_url}/register
}

##########################
#####      AUTH      #####
##########################
auth_url=http://localhost:7000/api

register_payload=integration/register.json
login_payload=integration/login.json
installation_payload=integration/add-installation.json
installation_user_payload=integration/add-installation-user.json

echo "\n\n***** Get User *****"
no_user=$(curl -X GET ${auth_url}/users/username/rey)
# [ "$no_user" = "[]" ] && echo false || echo true
result=$(assert_eq "" "$no_user" "Found user when expected not to be found")
if [ "$result" -ne 0 ]; then 
    return 1 
fi

echo "\n\n***** Register *****"
register_user=$(curl -X POST -H "Content-Type: application/json" -d @$register_payload ${auth_url}/register)
result=$(assert_eq "{\"username\":\"rey\"}" "$register_user" "Cannot create user since it already exist")
if [ "$result" -ne 0 ]; then 
    return 1 
fi

echo "\n\n***** Get User *****"
user=$(curl -X GET ${auth_url}/users/username/rey)
user_id=$(echo $user | jq -r .id)
echo "\n\nUser ID: "
echo $user_id
# result=$(assert_eq "{"username":"rey"}" "$user" "Cannot find new user")
# if [ "$user" =~ ^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$ ]; then 
if [ "$user" = "[]" ]; then 
    return 1 
fi

echo "\n\n***** Login *****"
tokens=$(curl -X POST -H "Content-Type: application/json" -d @$login_payload ${auth_url}/login)

echo "\n\nAccess Token: "
access_token=$(echo $tokens | jq -r '.accessToken')
echo $access_token
echo "\n\nRefresh Token: "
refresh_token=$(echo $tokens | jq -r '.refreshToken')
echo $refresh_token
echo "\n\nAuthorization Header: "
authorization_header=$(echo Authorization: Bearer $access_token)
echo $authorization_header

echo "\n\n***** Add Installation *****"
curl -X POST -H "Content-Type: application/json" -H "$authorization_header" -d @$installation_payload ${auth_url}/installations

echo "\n\n***** Get Installation *****"
installations=$(curl -X GET -H "Content-Type: application/json" -H "$authorization_header" -d @$installation_payload ${auth_url}/installations)
installation_id=$(echo $installations | jq -r .[1].id)
echo "\n\nInstallation ID: "
echo $installation_id

echo "\n\n***** Add InstallationUser *****"
curl -X POST -H "Content-Type: application/json" -H "$authorization_header" ${auth_url}/installations/${installation_id}/users/${user_id}


echo
