from typing import Dict

import fastapi
import fastapi.middleware.cors
import uvicorn
from pydantic import BaseModel

from server.providers.huggingface import HuggingFace
from server.providers.openai import OpenAI

OPENAI_API_KEY = "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"
openai_provider = OpenAI(OPENAI_API_KEY)
huggingface_provider = HuggingFace()

## Setup FastAPI server.
app = fastapi.FastAPI()
app.add_middleware(
    fastapi.middleware.cors.CORSMiddleware,
    allow_origins=["*", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health_check():
    return "LLMHub is up and running."


class CompletionRequest(BaseModel):
    prompt: str
    input: str
    config: Dict


@app.post("/completion")
async def get_completion(request: CompletionRequest):
    print(request)
    if request.config["engine"] == "flan-t5-xl":
        output, num_tokens, duration_s = huggingface_provider(
            request.prompt, request.input, request.config
        )
    else:
        output, num_tokens, duration_s = openai_provider(
            request.prompt, request.input, request.config
        )

    return {"output": output, "num_tokens": num_tokens, "duration_s": duration_s}


if __name__ == "__main__":
    # start server
    uvicorn.run(app, host="127.0.0.1", port=58001, log_level="info")
