from server.providers import OpenAI

openai = OpenAI("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")
print(
    openai(
        "This is a test prompt.", "", {"engine": "text-ada-001", "max_tokens": 10, "user": "test"}
    )
)
print(
    openai(
        "This is a test prompt.",
        "",
        {"engine": "text-davinci-003", "max_tokens": 10, "user": "test"},
    )
)
