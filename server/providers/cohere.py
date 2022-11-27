from typing import List, Optional

import cohere

from server.providers.base import LLM


class Cohere(LLM):
    def __init__(
        self,
        api_key: str,
        model_name: str,
        temperature: float = 0.9,
        max_tokens: int = 256,
        top_k: float = 0.0,
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
            max is 5.0
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
        self.client = cohere.client(api_key)

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

        self.llm_args = {
            "model": model_name,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "k": top_k,
            "p": top_p,
            "frequency_penalty": frequency_penalty,
            "presence_penalty": presence_penalty,
        }

        def __call__(self, prompt: str) -> str:
            """
            Calls the Cohere API to generate a response to the prompt.

            :param prompt: The prompt to generate a response to.

            Returns:
                Completed string.
            """
            # TODO: add check on exceeding max_tokens in API call?
            response = self.client.generate(prompt, **self.llm_args)
            return response.generations[0].text
