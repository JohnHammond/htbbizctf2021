#!/usr/bin/env sage

# from pwnlib import *
from minipwn import *
from sage.all import Mod
from Crypto.Util.number import long_to_bytes as l2b
from Crypto.Util.number import bytes_to_long as b2l
import re

host, port = "138.68.172.146", 30965

print("connecting")

bad = b"Killed"
banner = bad
while bad in banner:
    s = remote(host, port)
    try:
        banner = s.recvuntil("Enter your option: ")
    except EOFError:
        print("bad connection, restarting")
        continue
    if bad in banner:
        print("bad connection, restarting")

N, e = [ int(x) for x in re.findall(rb"\((\d+), (\d+)\)", banner)[0] ]
print(f"{N=}")
print(f"{e=}")

# http://the2702.com/2015/09/07/RSA-Blinding-Attack.html

r = 3
M = b2l(b'Hello, I am an admin of this server')
mBlinded = Mod(r^e*M,N)
print(f"{mBlinded=}")

def sign(message):
	s.sendline('1')
	s.recvuntil(b"Enter your message to be signed as an integer: ")
	s.sendline(str(message))
	return int(re.findall(rb': (\d+)\n',s.recvuntil("\n"))[0])

sBlinded = sign(mBlinded)
print(f'{sBlinded=}')

S = (sBlinded // r) % N
print(f"{S=}")

def verify(signature):
	s.sendline('2')
	s.recvuntil(b"Enter your message as an integer: ")
	s.sendline(str(M))
	s.recvuntil(b"Enter your signature for that message as an integer: ")
	s.sendline(str(signature))
	return s.recvuntil("\n")

print(verify(S))
print(s.recvall())