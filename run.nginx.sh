#!/usr/bin/env bash
export DOLLAR='$'
#https://serverfault.com/questions/577370/how-can-i-use-environment-variables-in-nginx-conf
envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf
nginx -g "daemon off;"
