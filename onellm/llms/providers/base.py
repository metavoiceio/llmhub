from abc import ABC, abstractmethod


class LLM(ABC):
    @abstractmethod
    def __call__(self, prompt: str) -> str:
        pass
