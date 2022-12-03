from typing import Dict

import fastapi
import fastapi.middleware.cors
import uvicorn

from server.providers.openai import OpenAI

OPENAI_API_KEY = "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"
llm_provider = OpenAI(OPENAI_API_KEY)

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
    return "OK"


@app.get("/completion")
async def get_completion(prompt: str, input: str, config: Dict[str, str]):
    output, num_tokens, duration_s = llm_provider(prompt, input, config)

    return {"output": output, "num_tokens": num_tokens, "duration_s": duration_s}


if __name__ == "__main__":
    # start server
    uvicorn.run(app, host="127.0.0.1", port=58000, log_level="info")
