const fs = require("fs-extra");
const { TOKEN_FILE_PATH } = require("./constants");

// USED BY APP

const get_token = async () => {
    if (fs.existsSync(TOKEN_FILE_PATH) && fs.statSync(TOKEN_FILE_PATH).isFile()) {
      const fileContent = await fs.readFile(TOKEN_FILE_PATH, "utf-8");
      const { token } = JSON.parse(fileContent);
      return token;
    }
    throw new Error("Please set up your LLMHub token using `llmhub auth`!");
  }

module.exports = { get_token };
