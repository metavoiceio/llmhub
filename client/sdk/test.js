const LLMHub = require("./main");

const llmhub = new LLMHub("https://www.llmhub.com/2/functions/5/share")
llmhub.run({
    input: "This is a test prompt"
}).then(
    (response) => {
        console.log(response);
    }
);
