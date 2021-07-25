#!/usr/bin/env python

import binascii
from os import urandom

import requests
from Crypto.Cipher import AES

# url = "http://localhost:5000"
url = "http://142.93.35.92:31096"


def reset(token):
    r = requests.post(url + "/api/reset", json={"token": token})
    return r.text


def login(password):
    r = requests.post(url + "/api/login", json={"password": password})
    return r.text


def decrypt(ciphertext):
    IV = ciphertext[:16]
    ct = ciphertext[16:]

    """
    I was running into an error here because there was seemingly a conflict
    between `pycrypto` and `pycryptodome`.
    The solution is to set up a virtual environment and cleanly use 
    pycryptodome
    """
    cipher = AES.new(key, AES.MODE_CFB, iv=IV)
    pt = cipher.decrypt(ct)
    print(pt, "SUCCESS")
    return pt


ct = b"a" * 16
password = b"A" * (72 - 16)

password = binascii.hexlify(ct + password).decode("latin-1")
# print(password)
print(reset(password))
key = urandom(16)
password = decrypt(password.encode("latin-1")).decode("latin-1")
# print(decrypt(password))
print(login(password))
