const path = require('path');
const os = require('os');

const BASE_URL = "https://www.llmhub.com/api/v0/";
const TOKEN_FILE_PATH = path.join(os.homedir(), ".llmhub", "credentials");

module.exports = {
    BASE_URL,
    TOKEN_FILE_PATH
}
