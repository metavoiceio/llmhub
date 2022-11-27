import fastapi
import fastapi.middleware.cors
import uvicorn

from server.hub.db_ops import apps, prompts, stars, usage, users
from server.providers.openai import OpenAI

# TODO: ability to swap providers easily?
# TODO: ability to swap models easily?
# TODO: best way to organise this so that users can issue generation against
#       any provider and any params easily?
OPENAI_API_KEY = "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"
# llm_provider = OpenAI(OPENAI_API_KEY, "code-davinci-002")
# llm_provider = OpenAI(OPENAI_API_KEY, "text-davinci-002")
llm_provider = OpenAI(OPENAI_API_KEY, "text-ada-001")

## Setup FastAPI server.
app = fastapi.FastAPI()
app.include_router(apps.router)
app.include_router(prompts.router)
app.include_router(users.router)
app.include_router(usage.router)
app.include_router(stars.router)
app.add_middleware(
    fastapi.middleware.cors.CORSMiddleware,
    allow_origins=["*", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TODO: convert to a database
llmhub_prompt_id_to_prompt = {
    "test": "This is a test prompt.",
}


@app.get("/")
async def health_check():
    return "OK"


@app.get("/completion")
async def get_completion(input: str, llmhub_prompt_id: str):
    # TODO: @sidroopdaska auth
    default_prompt = llmhub_prompt_id_to_prompt[llmhub_prompt_id]
    prompt = default_prompt + input
    # TODO: get num_tokens as well!
    answer = llm_provider(prompt)

    # append to usage!

    return {"completion": answer}


if __name__ == "__main__":
    # start server
    uvicorn.run(app, host="127.0.0.1", port=58000, log_level="info")
