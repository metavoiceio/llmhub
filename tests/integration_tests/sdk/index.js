import LLMHub from "llmhub";

// TODO: flow to mange app_id
const LLMHUB_PROMPT_ID = "test";

const llmhub = new LLMHub(LLMHUB_PROMPT_ID);
let answer = await llmhub.run("a b c");
console.log(answer);

// TODO: how to enable cli for node app?

// TODO: write tests for cli

// TODO: write tests for app getting the relevant token