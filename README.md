# LLM Hub: Iterate on prompts for production-use cases in the simplest way.

LLMHub is a platform that provides an OpenAI-playground-like experience for iterating on prompts/LLM providers, deploying the prompts, and capturing usage to further iteration. It provides a single UX experience on top of multiple LLM providers, with some initial features to make collaboration easier.

The LLM providers currently supported by LLMHub are OpenAI, Cohere, Aleph Alpha, flan-t5-xl via HuggingFace, and Salesforce Codegen via a server deployed by the maintainers. Unlike other LLM providers, LLMHub provides a starting point whenever a new task is undertaken by keeping public prompts and allowing users to fork them.

With LLMHub, integration into an application requires just 3 lines of code, making it easy to integrate any LLM into any javascript based backend or app. Instead of generating an API key, authorization is a simple 1-command process. Additionally, LLMHub provides an API call history, extremely simple authentication, and information on latency and tokens.

Once a prompt has been "deployed", it can be integrated within as simply as:
```js
const LLMHub = require("llmhub")
const llmhub = new LLMHub('<llmhub_share_link>')
llmhub.run(prompt_variables).then(({ output }) => { console.log(output) });
```

LLMHub offers additional features that allow you to monitor and improve your prompts easily, track costs, latency, and accuracy, and showcase the impact of improvements. Contributors can easily contribute to popular prompts and improve their skills.

We created LLMHub to solve common encountered we faced as users of LLM providers, including difficulty getting started, comparing models and prompts, and finding prompts in the open-source ecosystem. With LLMHub, we aim to make it easier to improve the accuracy, latency, and costs of your prompts and provide a systematic process for prompt improvement.

## Setup - Self Deployment

1. (LLM Providers) You would need to create API keys for OpenAI, Cohere, Huggingface, and set them.
2. (Database) Create a supabase database, and set the URL/Key.
3. (Github Auth) Create an auth0.com account, and set the Auth0 Client ID, secret, and issuer.
