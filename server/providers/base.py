from abc import ABC, abstractmethod
from typing import Dict


class LLM(ABC):
    @abstractmethod
    def __call__(self, prompt: str, input: str, config: Dict[str, str]) -> str:
        pass
