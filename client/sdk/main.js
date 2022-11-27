import fetch from 'node-fetch';
import { BASE_URL } from './common.js';
import { get_token } from './app_auth.js';

export default class LLMHub {
    constructor(llmhub_prompt_id) {
        this.auth_token = null;
        this.llmhub_prompt_id = llmhub_prompt_id;
    }

    async run(prompt) {
        try {
            if (this.auth_token === null) {
                this.auth_token = await get_token();
            }

            let response = await fetch(
                `${BASE_URL}/completion?input=${encodeURIComponent(prompt)}&llmhub_prompt_id=${this.llmhub_prompt_id}`,
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
            console.log("query returned successfully");
        }
    }
    
}
