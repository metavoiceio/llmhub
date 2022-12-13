// Tests the LLMHub SDK after going through npm install!
const LLMHub = require("llmhub");

const llmhub = new LLMHub("https://www.llmhub.com/2/functions/5/share")
llmhub.run({ description: "This is a test prompt" }).then(
    (response) => {
        console.log(response);
    }
);
