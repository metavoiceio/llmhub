import time
from typing import Dict, List, Optional

import cohere

from server.providers.base import LLM


class Cohere(LLM):
    def __init__(
        self,
        api_key: str,
        model_name: str = "command-xlarge-20221108",
        temperature: float = 0.9,
        max_tokens: int = 256,
        top_k: int = 0,
        top_p: float = 0.75,
        frequency_penalty: float = 0.0,
        presence_penalty: float = 0.0,
        stop: Optional[List[str]] = None,
    ) -> None:
        """
        Initaliser for the Cohere completion API.

        :param api_key: Cohere API key.
        :param model_name: The size of model to generate with. Alternatively,
            custom models can also be supplied with their full ID.
        :param max_tokens: The maximum number of tokens to generate.
        :param temperature: Higher values means the model will take more risks.
            min value of 0.0, max value of 5.0 (!).
        :param top_k: Ensures only the top k most likely tokens are
            considered for generation at each step. Min is 0 (default),
            max is 500.
        :param top_p:  If set to a probability 0.0 < p < 1.0, it ensures that only the
            most likely tokens, with total probability mass of p, are considered for
            generation at each step. If both k and p are enabled, p acts after k.
        :param frequency_penalty: between 0.0 and 1.0. Can be used to reduce repetitiveness
            of generated tokens. The higher the value, the stronger a penalty is applied to
            previously present tokens, proportional to how many times they have already appeared
            in the prompt or prior generation.
        :param presence_penalty: between 0.0 and 1.0. Can be used to reduce repetitiveness of generated
            tokens. Similar to frequency_penalty, except that this penalty is applied equally to all tokens
            that have already appeared, regardless of their exact frequencies.
        :param stop: A stop sequence will cut off your generation at the end of the sequence.
            Providing multiple stop sequences in the array will cut the generation at the first stop
            sequence in the generation.
        """
        # TODO: be careful about these parameters.
        #       They behave differently than in OpenAI
        self.client = cohere.Client(api_key)

        if temperature < 0.0 or temperature > 5.0:
            raise ValueError("Temperature must be between 0.0 and 5.0.")

        if top_k < 0.0 or top_k > 5.0:
            raise ValueError("k must be between 0.0 and 5.0.")

        if top_p < 0.0 or top_p > 1.0:
            raise ValueError("p must be between 0.0 and 1.0.")

        if frequency_penalty < 0.0 or frequency_penalty > 1.0:
            raise ValueError("Frequency penalty must be between 0.0 and 1.0.")

        if presence_penalty < 0.0 or presence_penalty > 1.0:
            raise ValueError("Presence penalty must be between 0.0 and 1.0.")

        self.__llm_config = {
            "model": model_name,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "k": top_k,
            "p": top_p,
            "frequency_penalty": frequency_penalty,
            "presence_penalty": presence_penalty,
            "stop_sequences": stop,
        }

    def map_frontend_config(self, frontend_config: Dict) -> Dict:
        # TODO: add checks again?
        # TODO: check "model" and "engine" aren't both present
        # TODO: check all parameters.
        mapping = {
            "engine": "model",
            "presencePenalty": "presence_penalty",
            "frequencyPenalty": "frequency_penalty",
            "maximumLength": "max_tokens",
            "stopSequences": "stop_sequences",
        }
        new_config = {}
        for k, v in frontend_config.items():
            if k in mapping:
                new_config[mapping[k]] = v
            elif k == "user":
                pass
            else:
                new_config[k] = v

        if "stop_sequences" in new_config:
            if new_config["stop_sequences"] == "":
                new_config["stop_sequences"] = None
            else:
                new_config["stop_sequences"] = new_config["stop_sequences"].split(",")

        if "k" in new_config:
            # TODO: add checks
            # TODO: make sure this is dealt with in the frontend
            new_config["k"] = int(new_config["k"])

        return new_config

    def __call__(self, prompt: str, input: str, config: Dict) -> str:
        """
        Calls the Cohere API to generate a response to the prompt.

        :param prompt: The prompt to generate a response to.

        Returns:
            Completed string.
        """
        self.call_config = self.__llm_config.copy()
        self.call_config.update(self.map_frontend_config(config))
        # TODO: CONFIG IS NOT GETTING REGISTER!!

        # TODO: add check on exceeding max_tokens?
        # TODO: add variable replace?
        # TODO: abstract this logic and make sure it works for huggingface?
        print(self.call_config)
        client_input = prompt + input
        start_time = time.time()
        # TODO: add check on exceeding max_tokens in API call?
        response = self.client.generate(prompt=client_input, **self.call_config)
        generated_text = response.generations[0].text
        end_time = time.time()

        return (
            generated_text,
            (len(client_input) + len(generated_text)) // 4,
            end_time - start_time,
        )
