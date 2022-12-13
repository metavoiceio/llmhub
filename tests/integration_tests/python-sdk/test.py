from llmhub.client import Client as LlmhubClient

llm = LlmhubClient("https://www.llmhub.com/7/functions/16/share")
print(llm.run("h"))
