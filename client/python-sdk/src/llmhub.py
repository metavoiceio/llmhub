import json
import os
from pathlib import Path

import requests

TOKEN_FILE_PATH = os.path.join(Path.home(), ".llmhub", "credentials")


def get_token():
    if os.path.isfile(TOKEN_FILE_PATH):
        with open(TOKEN_FILE_PATH, "r") as f:
            token = json.load(f)["token"]
        return token
    else:
        raise Exception("Please set up LLMHub authentication using `llmhub auth`.")


class Client:
    def __init__(self, llmhub_share_url: str):
        llmhub_share_url = Path(llmhub_share_url)

        # Check that there are 7 parts to the URL
        if len(llmhub_share_url.parts) != 6:
            raise ValueError("Invalid LLMHub share URL")

        if "llmhub.com" not in llmhub_share_url.parts[1]:
            raise ValueError("Invalid LLMHub share URL")

        if llmhub_share_url.parts[-1] != "share":
            raise ValueError("Invalid LLMHub share URL")

        if llmhub_share_url.parts[3] != "functions":
            raise ValueError("Invalid LLMHub share URL")

        self.workspace_id = llmhub_share_url.parts[2]
        self.function_id = llmhub_share_url.parts[4]
        self.token = None

    def run(self, input: str) -> str:
        if self.token is None:
            self.token = get_token()

        url = f"https://www.llmhub.com/api/v0/{self.workspace_id}/functions/{self.function_id}"
        # url = f"http://localhost:3000/api/v0/{self.workspace_id}/functions/{self.function_id}"

        headers = {"Authorization": f"Bearer {self.token}", "Content-Type": "application/json"}

        data = {"input": input, "mode": "direct"}

        response = requests.post(url, headers=headers, json=data)

        response.raise_for_status()

        return response.json()
