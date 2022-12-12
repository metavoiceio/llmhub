from abc import ABC, abstractmethod
from typing import Dict


class LLM(ABC):
    def _preprocess_input(self, prompt: str, input: Dict) -> str:
        for k, v in input.items():
            prompt = prompt.replace("{{" + k + "}}", v)

        return prompt

    def __call__(self, prompt: str, input: Dict, config: Dict) -> str:
        del config # unused
        
        client_input = self._preprocess_input(prompt, input)

        return client_input
