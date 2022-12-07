import Head from "next/head";

export default function Header() {
  return (
    <Head>
      <title>LLM Hub</title>
      <meta name="description" content="LLMHub is where people build software on top of Large Language Models (LLMs). Use LLMHub to improve, discover, fork, and contribute to prompts." />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta property="og:site_name" content="LLMHub" />
      <meta property="og:type" content="website" />
      {/* <meta property="og:image" content="/android-chrome-512x512.png" /> */}
      {/* <meta property="og:image:type" content="image/png" /> */}
      <meta property="og:image:alt" content="LLMHub icon" />
      <meta property="og:title" content="LLMHub" />
      <meta property="og:url" content="https://llmhub.com" />
      <meta property="og:description" content="LLMHub is where people build software on top of Large Language Models (LLMs). Use LLMHub to improve, discover, fork, and contribute to prompts." />
      {/* <meta property="twitter:card" content="summary_large_image" /> */}
      <meta property="twitter:url" content="https://llmhub.com" />
      <meta property="twitter:title" content="LLMHub" />
      <meta property="twitter:description" content="LLMHub is where people build software on top of Large Language Models (LLMs). Use LLMHub to improve, discover, fork, and contribute to prompts." />
      {/* <meta property="twitter:image" content="" /> */}
      {/* <meta name="next-head-count" content="18" /> */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      {/* <meta name="theme-color" content="#ffffff"></meta> */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" />
    </Head>
  );
}
