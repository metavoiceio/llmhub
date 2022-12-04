import requests

req = requests.post(
    "https://api.llmhub.com/completion",
    json={
        "prompt": "This is a test prompt.",
        "input": "",
        "config": {"engine": "text-davinci-003", "user": "test-integration"},
    },
)
print(req.json())
