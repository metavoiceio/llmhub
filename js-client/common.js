import path from "path";
import os from "os";

// export const BASE_URL = "https://api.llmhub.com";
export const BASE_URL = "https://458f691f-d0e2-45f7-a1fe-5cdcccf4a867.mock.pstmn.io";
// TODO: what's the best to place the below?
export const LLMHUB_APP_ID = null; // NOTE: this needs to be set per app!
export const TOKEN_FILE_PATH = path.join(os.homedir(), ".llmhub", ".credentials");
