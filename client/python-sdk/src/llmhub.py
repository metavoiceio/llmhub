from pathlib import Path
import json
import os

import requests

TOKEN_FILE_PATH = os.path.join(
    Path.home(),
    ".llmhub",
    "credentials"
)

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
        
        self.workspace_id = llmhub_share_url.parts[3]
        self.function_id = llmhub_share_url.parts[5]
        
    def run(self, input: str) -> str:
        token = get_token()
        
        response = requests.post(
            f"https://www.llmhub.com/api/v0/{self.workspace_id}/functions/{self.function_id}",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {token}"
                },
            json={
                "input": input,
                "mode": "direct"
            }
        )
        
        print(response.json())
        
        if response.status_code != 200:
            raise RuntimeError(f"LLMHub function returned status code {response.status_code}")
        
        return response.json()["output"]
