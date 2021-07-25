#!/usr/bin/env python3

import re

import requests

url = "http://159.65.58.156:31752/"


s = requests.Session()


def get_notes():

    r = s.get(url)
    # return re.findall(r"<ul id='tasks'>(.*)</ul>", r.text, re.DOTALL | re.MULTILINE)
    return r.text


def post_note(data):
    r = s.post(
        url + "graphql",
        json={
            "query": """
mutation { 
    createNote(
        title: \""""
            + f"{data}"
            + """\",
    ) 
    {
        id,
        title
    }
}"""
        },
    )

    return r.text


print(post_note("hello"))
print(get_notes())


s.close()
