const { LLMHub } = require("./main");

const llmhub = new LLMHub(1, 3);
llmhub.run("This is a test prompt").then(
    (output) => {
        console.log(output);
    }
);