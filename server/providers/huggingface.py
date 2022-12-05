import time
from typing import Dict

import requests

from server.providers.base import LLM

API_TOKEN = "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"

API_URL = "https://dcks6mrqe7w3t87f.us-east-1.aws.endpoints.huggingface.cloud"
headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json",
}


class HuggingFace(LLM):
    def __init__(self) -> None:
        super().__init__()

    def __call__(self, prompt: str, input: str, config: Dict) -> str:
        start_time = time.time()
        response = requests.post(
            API_URL,
            headers=headers,
            json={
                "inputs": prompt + input,
            },
        )
        end_time = time.time()

        return response.json()[0]["generated_text"], 0, end_time - start_time
