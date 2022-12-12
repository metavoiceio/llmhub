import time
from typing import Dict

import requests

from server.providers.base import LLM

API_URL = "https://8a9a-35-203-168-64.ngrok.io/api"
headers = {
    "Content-Type": "application/json",
}


class InternalServer(LLM):
    def __init__(self) -> None:
        super().__init__()

    def __call__(self, prompt: str, input: Dict, config: Dict) -> str:
        client_input = super().__call__(prompt, input, config)

        start_time = time.time()
        response = requests.post(
            API_URL,
            headers=headers,
            json={
                "prompt": client_input,
                "input": "",
            },
        )
        end_time = time.time()

        completion = response.json()["completion"]

        num_tokens = len(client_input + completion) // 4

        return completion, num_tokens, end_time - start_time
