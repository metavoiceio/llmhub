// Tests the LLMHub SDK without going through npm.
const LLMHub = require("./main");

const llmhub = new LLMHub("https://www.llmhub.com/2/functions/5/share")
llmhub.run({
    request: "This is a test prompt"
}).then(
    (response) => {
        console.log(response);
    }
);
