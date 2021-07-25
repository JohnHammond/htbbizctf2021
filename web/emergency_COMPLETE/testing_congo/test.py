import json

from jwcrypto import jwk, jwt

# openssl genrsa -out private.pem 2048 #

with open("private.pem", "rb") as pemfile:
    key = jwk.JWK.from_pem(pemfile.read())

# Export public key in JWK format
pub_jwk = key.export(
    private_key=False,
)  # generate the jwk
jwks = {"keys": []}
jwks["keys"].append(json.loads(pub_jwk))

# Save the jwks to a file
with open("jwks.json", "w") as jwks_file:
    jwks_file.write(json.dumps(jwks))

# Generate our JWT with our own jku and admin as the username
token = jwt.JWT(
    header={
        "alg": "RS256",
        "kid": key.key_id,
        "jku": "http://johnhammond.org/jwks.json",
    },
    claims={"username": "admin", "iat": 1627062113, "exp": 9999999999},
)

# Sing token with our private key
token.make_signed_token(key)
print(token.serialize())
