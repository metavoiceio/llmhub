import time
from typing import Dict, List, Optional, Union

import openai

from server.providers.base import LLM


class OpenAI(LLM):
    def __init__(
        self,
        api_key: str,
        model_name: str = "text-davinci-003",
        temperature: float = 0.7,
        max_tokens: int = 256,
        top_p: float = 1.0,
        frequency_penalty: float = 0.0,
        presence_penalty: float = 0.0,
        stop: Optional[Union[str, List[str]]] = None,
    ) -> None:
        """
        Initaliser for the OpenAI completion API.

        :param api_key: The OpenAI API key.
        :param model_name: The OpenAI ID of the model to use.
        :param temperature: Higher values means the model will take more risks.
            Use 0.9 for more creative applications, and 0 (argmax sampling) for
            a well-defined answer.
        :param max_tokens: The maximum number of tokens to generate.
        :param top_p: An alternative to sampling with temperature, called nucleus sampling,
            where the model considers the results of the tokens with top_p probability mass.
            So 0.1 means only the tokens comprising the top 10% probability mass are considered.
        :param frequency_penalty: Number between -2.0 and 2.0. Positive values penalize new tokens
            based on their existing frequency in the text so far, decreasing the model's likelihood
            to repeat the same line verbatim.
        :param presence_penalty: Number between -2.0 and 2.0. Positive values penalize new tokens
            based on whether they appear in the text so far, increasing the model's likelihood to talk
            about new topics.
        :param stop: Up to 4 sequences where the API will stop generating further tokens.
            The returned text will not contain the stop sequence.

        """
        openai.api_key = api_key
        self.client = openai.Completion

        if top_p < 1 and temperature < 1:
            raise ValueError("Cannot use top_p and temperature together.")

        if stop and len(stop) > 4:
            raise ValueError("Cannot use more than 4 stop sequences.")

        if frequency_penalty < -2 or frequency_penalty > 2:
            raise ValueError("Frequency penalty must be between -2 and 2.")

        if presence_penalty < -2 or presence_penalty > 2:
            raise ValueError("Presence penalty must be between -2 and 2.")

        self.__llm_config = {
            "engine": model_name,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "top_p": top_p,
            "frequency_penalty": frequency_penalty,
            "presence_penalty": presence_penalty,
            "stop": stop,
        }

    def map_frontend_config(self, frontend_config: Dict) -> Dict:
        # TODO: add "model"
        # TODO: add checks again?
        # TODO: check "model" and "engine" aren't both present
        # TODO: check all parameters.
        mapping = {
            "model": "engine",
            "presencePenalty": "presence_penalty",
            "frequencyPenalty": "frequency_penalty",
            "maximumLength": "max_tokens",
            "stopSequences": "stop",
        }
        new_config = {}
        for k, v in frontend_config.items():
            if k in mapping:
                new_config[mapping[k]] = v
            else:
                new_config[k] = v

        # massage stop sequences to the right data type
        if "stop" in new_config:
            if new_config["stop"]:
                new_config["stop"] = new_config["stop"].split(",")
        return new_config

    def __call__(self, prompt: str, input: Dict, config: Dict) -> str:
        """
        Calls the OpenAI API to generate a response to the prompt.

        :param prompt: The prompt to generate a response to.

        Returns:
            Completed string.
        """
        client_input = super().__call__(prompt, input, config)

        self.call_config = self.__llm_config.copy()
        self.call_config.update(self.map_frontend_config(config))
        print(self.call_config)

        # TODO: add check on exceeding max_tokens?
        # TODO: add variable replace?
        # TODO: abstract this logic and make sure it works for huggingface?
        start_time = time.time()
        response = self.client.create(prompt=client_input, **self.call_config)
        end_time = time.time()

        return response.choices[0].text, response.usage.total_tokens, end_time - start_time
