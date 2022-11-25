#!/usr/bin/env python
# -*- coding: utf-8 -*-

# pylint: skip-file

from setuptools import find_packages, setup

##### Dependencies of llm

requirements = [
    "typing_extensions",
]
LLM_REQUIREMENTS = ["openai"]
DEV_REQUIREMENTS = ["black", "flake8", "isort", "mypy", "pytest", "sphinx"]


def read_file(filename: str) -> str:
    with open(filename, encoding="utf-8") as f:
        return f.read().strip()


version = read_file("VERSION")
readme_text = read_file("README.md")

packages = find_packages(".", exclude=["tests"])

setup(
    name="llm",
    version=version,
    # author="",
    # author_email="team",
    # description="",
    long_description=readme_text,
    long_description_content_type="text/markdown",
    # license="",
    # keywords="",
    # url="",
    project_urls={
        "Source on GitHub": "https://github.com/metavoice.xyz/llm",
        # "Documentation": "https://llm.github.io/llm/",
    },
    packages=packages,
    package_data={"": ["*.lark"]},
    include_package_data=True,
    install_requires=requirements,
    extras_require={"prod": LLM_REQUIREMENTS, "dev": LLM_REQUIREMENTS + DEV_REQUIREMENTS},
    python_requires=">=3.10",
)
