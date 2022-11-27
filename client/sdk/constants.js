const path = require('path');
const os = require('os');

// export const BASE_URL = "https://api.llmhub.com";
const BASE_URL = "https://458f691f-d0e2-45f7-a1fe-5cdcccf4a867.mock.pstmn.io";
const TOKEN_FILE_PATH = path.join(os.homedir(), ".llmhub", "credentials");

module.exports = {
    BASE_URL,
    TOKEN_FILE_PATH
}
