# LLM Hub: Github for LLMs
LLMHub provides an OpenAI-playground like experience (history, simple parameter choices, & prompt variables) for experimenting with & deploying prompts on top of various LLM providers. 

Instead of having to generate an API key, and manually copy that over, authorization is a simple 1-click process, and integration requires just 3-lines.

The LLM providers supported are: OpenAI, Cohere, Aleph Alpha, flan-t5-xl via HuggingFace, and Salesforce Codegen via a server deployed by the maintainers.

Once a prompt has been "deployed", it can be integrated within an app as simply as:
```js
const LLMHub = require("llmhub")
const llmhub = new LLMHub('<llmhub_share_link>')
llmhub.run(prompt_variables).then(({ output }) => { console.log(output) });
```

- Share functionality & forking?
- Provides API call history
- Extremely simple auth
- Provides latency, and token information.

### Finetuning support
### Support for learning from customer data

### ??

### TODO
1. make sure no secrets get deployed