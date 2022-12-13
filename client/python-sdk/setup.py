#!/usr/bin/env python
# -*- coding: utf-8 -*-

# pylint: skip-file
from setuptools import find_packages, setup

##### Dependencies of llm

PROD_REQUIREMENTS = ["requests"]
DEV_REQUIREMENTS = ["black", "flake8", "isort", "mypy", "pytest", "sphinx", "twine"]


def read_file(filename: str) -> str:
    with open(filename, encoding="utf-8") as f:
        return f.read().strip()


version = "0.0.3"
readme_text = read_file("README.md")

setup(
    name="llmhub",
    version=version,
    author="LLMHub",
    author_email="vatsal@llmhub.com",
    # description="",
    long_description=readme_text,
    long_description_content_type="text/markdown",
    packages=find_packages("src", exclude=["tests"]),
    package_dir={"": "src"},
    package_data={"": ["*.lark"]},
    include_package_data=True,
    install_requires=PROD_REQUIREMENTS,
    extras_require={"prod": PROD_REQUIREMENTS, "dev": PROD_REQUIREMENTS + DEV_REQUIREMENTS},
    python_requires=">=3.10",
)
