import fs from "fs-extra";
import { TOKEN_FILE_PATH } from "./constants.js";

// USED BY APP

export const get_saved_token = async () => {
    if (fs.existsSync(TOKEN_FILE_PATH) && fs.statSync(TOKEN_FILE_PATH).isFile()) {
      const fileContent = await fs.readFile(TOKEN_FILE_PATH, "utf-8");
      const [name, value] = fileContent?.split("=") || [];
      if (name === "LLMHUB_USER_ID") {
        return value.trim();
      }
    }
    return null;
  }


export const get_token = async () => {
  let token = await get_saved_token();
  if (token) {
    return token;
  }
  throw new Error("Please set up your LLMHub token using `llmhub-auth`!");
}
