import Footer from "../components/footer"
import Header from "../components/header"
import UnAuthNavBar from "../components/unAuthNavBar"
import styles from '../styles/Home.module.css'

export default function Home() {
  const renderValuePropDiv = (title, points) => {
    return (
      <div className={styles.valuePropDiv}>
        <h2 className={styles.valuePropTitle}>{title}</h2>
        <ul className={styles.valuePropList}>
          {points.map((point) => (
            <li className={styles.valuePropPoint}>{point}</li>
          ))}
        </ul>
      </div>
    )
  }


  return (
    <div className={styles.container}>
      <UnAuthNavBar />
      <main className={styles.main}>
        <h1 className={styles.title}>LLMHub</h1>
        <h3 className={`${styles.hubIntro} mt-2 mb-2`}>Large Language Model-based applications are hard to build and hard to use.</h3>
        <h3 className={`${styles.hubIntro} mb-5`}>LLMHub is the best place on the 👨‍💻 to discover, create, ship, and use prompts.</h3>
        {/* <h3 className={styles.hubIntro}> LLM-based apps are programmed in a completely new way.   </h3>
        <h3 className={`${styles.hubIntro} mb-5`}> We fix all the problems with building apps on top of them, and with using those apps.</h3> */}
        <div className={styles.valuePropsContainer}>
        {renderValuePropDiv("App Users", [
          "🤯 Best way to use open-source projects that use LLMs.",
          "💆 Ease of use: 1-time 1-click setup",
          "🙌 No need to setup APIs with different providers",
          "💰 Easy tracking across providers",
          "💸 Free credits"
        ])}
        {renderValuePropDiv("Developers", [
          "🍳 Easy deployment",
          "😌 Standardised API across all providers, and prompts.",
          "💇 Abstract away auth and integration with LLM providers.",
          "💪 Showcase your work easily",
          "💻 Visibility into the behavior of prompt",
          "📻 Easy finetuning",
          "🌎 Access to open-source based large language models",
          "🔧 Tools to improve prompts - latency, speed, and accuracy",
          "💵 Free credits"
        ]
        )}
        {renderValuePropDiv("Contributors", [
          "🕵️ Find popular prompts to contribute to easily",
          "🛠️ Tools to showcase improvements to prompts",
          "🤔 Standardisation of evaluation",
          "🧘‍♂️ Focus on improving prompts, not on setting up.",
          "🔥 Showcase your contributions on the hub",
        ]
        )}
      </div>
      </main>
      <Footer />
    </div>
  );
}
