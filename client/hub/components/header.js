import Head from "next/head";

export default function Header() {
    return (
        <Head>
            <title>LLMHub</title>
            <meta name="description" content="LLMHub is where people build software on top of Large Language Models (LLMs). People use LLMHub to discover, fork, and contribute to prompts." />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" />
        </Head>
    );
}