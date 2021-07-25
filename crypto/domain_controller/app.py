import json
from os import urandom

from Crypto.Cipher import AES
from flask import Flask, jsonify, render_template, request
from secret import FLAG


class Crypto:
    def __init__(self):
        self.key = urandom(16)
        self.password = urandom(53)

    def encrypt(self, pt):
        IV = urandom(16)
        cipher = AES.new(self.key, AES.MODE_CFB, iv=IV, segment_size=8)
        ct = cipher.encrypt(pt)

        return IV + ct

    def decrypt(self, ciphertext):
        IV = ciphertext[:16]
        ct = ciphertext[16:]

        cipher = AES.new(self.key, AES.MODE_CFB, iv=IV, segment_size=8)
        pt = cipher.decrypt(ct)
        print(pt)
        return pt


crypto = Crypto()
app = Flask(__name__)


@app.route("/api/login/", methods=["POST"])
def api_login():
    try:
        pw = request.json.get("password")
        pw = bytes.fromhex(pw)
        if pw == crypto.password:
            return jsonify({"flag": FLAG})
        else:
            return jsonify({"error": "Invalid password"})
    except:
        return jsonify({"error": "Invalid input."})


@app.route("/api/reset/", methods=["POST"])
def api_reset():
    try:
        ct = request.json.get("token")
        token_ct = bytes.fromhex(ct)
        if len(token_ct) < 69:
            return jsonify({"error": "Password should be at least 53 characters long."})
        crypto.key = urandom(16)
        token = crypto.decrypt(token_ct)  # this would fail
        crypto.password = token
        return jsonify({"success": "Password has been reset."})
    except Exception as e:
        return jsonify({"error": "Invalid input."})


if __name__ == "__main__":
    app.run()
