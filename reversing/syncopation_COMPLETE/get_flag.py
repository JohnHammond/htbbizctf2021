#!/usr/bin/env python

data = [
    0x48,
    0x42,
    0xEC,
    0x99,
    0xEA,
    0x54,
    0xEC,
    0x99,
    0xEA,
    0xC2,
    0x42,
    0x99,
    0xEA,
    0xC2,
    0x52,
    0x7B,
    0xEA,
    0xC2,
    0x52,
    0x2A,
    0x34,
    0xC2,
    0x52,
    0x2A,
    0x09,
    0x5F,
    0x52,
    0x2A,
    0x09,
    0x7D,
    0x72,
    0x2A,
    0x09,
    0x7D,
    0x81,
    0x34,
    0x09,
    0x7D,
    0x81,
    0xC6,
    0x74,
    0x7D,
    0x81,
    0xC6,
    0x2A,
    0x68,
    0x81,
    0xC6,
    0x2A,
    0xE9,
    0x33,
    0xC6,
    0x2A,
    0xE9,
    0xF6,
    0x72,
    0x2A,
    0xE9,
    0xF6,
    0x21,
    0x5F,
    0xE9,
    0xF6,
    0x21,
    0xAD,
    0x30,
    0xF6,
    0x21,
    0xAD,
    0x62,
    0x66,
    0x21,
    0xAD,
    0x62,
    0x00,
    0x66,
    0xAD,
    0x62,
    0x00,
    0xBD,
    0x62,
    0x62,
    0x00,
    0xBD,
    0xCF,
    0x33,
    0x00,
    0xBD,
    0xCF,
    0x59,
    0x34,
    0xBD,
    0xCF,
    0x59,
    0x1C,
    0x74,
    0xCF,
    0x59,
    0x1C,
    0x7C,
    0x5F,
    0x59,
    0x1C,
    0x7C,
    0x90,
    0x62,
    0x1C,
    0x7C,
    0x90,
    0x50,
    0x31,
    0x7C,
    0x90,
    0x50,
    0x5D,
    0x6E,
    0x90,
    0x50,
    0x5D,
    0x82,
    0x34,
    0x50,
    0x5D,
    0x82,
    0x70,
    0x72,
    0x5D,
    0x82,
    0x70,
    0x0E,
    0x79,
    0x82,
    0x70,
    0x0E,
    0x84,
    0x21,
    0x70,
    0x0E,
    0x84,
    0xF3,
    0x7D,
    0x0E,
    0x84,
    0xF3,
    0x72,
    0x00,
    0x84,
    0xF3,
    0x72,
    0xE7,
]


for d in range(0, len(data), 5):
    print(chr(data[d]), end="")
