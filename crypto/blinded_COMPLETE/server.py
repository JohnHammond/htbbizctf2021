from Crypto.Util.number import getPrime, bytes_to_long, long_to_bytes
from math import gcd

e = 0x10001
while True:
  p, q = getPrime(1024), getPrime(1024)
  if gcd(p-1, e) == 1 and gcd(q-1, e) == 1: # Make sure the parameters are valid.
    break

n = p * q
d = pow(e,-1,(p-1)*(q-1))

pubkey = (n, e)
privkey = (n, d)

to_sign = b'Hello, I am an admin of this server'

def sign(message, privkey):
    n, d = privkey
    return pow(message, d, n)
    
def verify(message, signature, pubkey):
    n, e = pubkey
    if pow(signature, e, n) == message:
        return True
    else:
        return False

menu = """
[1] Sign a message
[2] Verify access to this server
[3] Exit
"""[1:]

def main():
    print("Welcome to the Automated Admin Message Signer. If you are not the admin, please disconnect immediately.")
    print(f"The public key being used by this server is {pubkey}")
    while True:
        print(menu)
        try:
            option = int(input("Enter your option: "))
            if option == 1:
                message = int(input("Enter your message to be signed as an integer: "))
                if (message % n) == bytes_to_long(to_sign):
                    print("Sorry, you cannot sign the admin message. This incident has been reported.")
                    exit(0)
                else:
                    print(f"Signature for {long_to_bytes(message)}: {sign(message, privkey)}")
            elif option == 2:
                message = int(input("Enter your message as an integer: "))
                signature = int(input("Enter your signature for that message as an integer: "))
                if verify(message, signature, pubkey):
                    if long_to_bytes(message) == to_sign:
                        print("Access granted. Welcome, admin.")
                        print(open("flag.txt").read())
                        exit(0)
                    else:
                        print("Signature valid. Message does not equal admin message however. Access denied.")
            elif option == 3:
                print("Goodbye.")
                exit(0)
            else:
                print("Option is not in available options.")
        except Exception as e:
            print("An error occurred when trying to retrieve your input, please try again.", e)
            
main()
