const { LLMHub } = require("./main");

const llmhub = new LLMHub("https://www.llmhub.com/2/functions/5/share")
llmhub.run("This is a test prompt").then(
    (output) => {
        console.log(output);
    }
);
