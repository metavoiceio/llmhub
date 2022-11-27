import fetch from 'node-fetch';
import { BASE_URL, LLMHUB_APP_ID } from './constants.js';
import { get_token } from './appAuth.js';

export default class LLMHub {
    constructor() {
        this.auth_token = null;
    }

    async run(prompt) {
        try {
            if (this.auth_token === null) {
                this.auth_token = await get_token();
            }

            let response = await fetch(
                `${BASE_URL}/completion?prompt=${encodeURIComponent(prompt)}&llmhub_app_id=${LLMHUB_APP_ID}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.auth_token}`,
                    }
                });
            response = await response.json();
            return response.completion;
        } catch (error) {
            // TODO: credit checking should happen here.
            //       API should check we have enough to run the query (aka generation + prompt size!)
            console.error(error);
        } finally {
            console.log("done");
        }
    }
    
}
