const fetch = require('node-fetch-commonjs');
const { BASE_URL } = require('./constants');
const { get_token } = require('./appAuth');

class LLMHub {
    constructor(workspace_id, function_id) {
        this.auth_token = null;
        this.workspace_id = workspace_id;
        this.function_id = function_id;
    }

    async run(input) {
        try {
            if (this.auth_token === null) {
                this.auth_token = await get_token();
            }

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
            return output;
        } catch (error) {
            // TODO: credit checking should happen here.
            //       API should check we have enough to run the query (aka generation + prompt size!)
            console.error(error);
        } finally {
            console.log("query returned successfully");
        }
    }    
}

module.exports = { LLMHub };