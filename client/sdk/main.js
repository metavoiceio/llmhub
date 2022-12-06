const fetch = require('node-fetch-commonjs');
const { BASE_URL } = require('./constants');
const { get_token } = require('./token');

class LLMHub {
    constructor(llmhub_share_url) {
        const path = llmhub_share_url.split("/");

        if (path.length !== 7) {
            throw new Error("Invalid share URL");
        }
        if (path[1] !== "") {
            throw new Error("Invalid share URL");
        }
        if (path[6] !== "share") {
            throw new Error("Invalid share URL");
        }
        if (path[4] !== "functions") {
            throw new Error("Invalid share URL");
        }
        if (!path[2].includes("llmhub.com")) {
            throw new Error("Invalid share URL");
        }

        this.workspace_id = path[3];
        this.function_id = path[5];
        this.auth_token = null;
    }

    async run({input}) {
        try {
            if (this.auth_token === null) {
                this.auth_token = await get_token();
            }

            // TODO: add credit checking, so the query doesn't run if the user doesn't have enough credits

            let response = await fetch(
                `${BASE_URL}/${this.workspace_id}/functions/${this.function_id}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.auth_token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        input,
                        mode: "direct",
                    }),
                });
            const { output, num_tokens, duration_s } = await response.json();
            return { output, num_tokens, duration_s };
        } catch (error) {
            console.error(error);
        }
    }    
}

module.exports = LLMHub;
