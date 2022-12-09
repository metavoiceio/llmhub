import Footer from "../components/footer"
import UnAuthNavBar from "../components/unAuthNavBar"
import styles from '../styles/Home.module.css'

export default function Home() {
  const renderValuePropDiv = (title, points) => {
    return (
      <div className={styles.valuePropDiv}>
        <h2 className={styles.valuePropTitle}>{title}</h2>
        <ul className={styles.valuePropList}>
          {points.map((point, index) => (
            <li key={index} className={styles.valuePropPoint}>{point}</li>
          ))}
        </ul>
      </div>
    )
  }


  return (
    <div className={`${styles.container} dark:bg-gray-900 flex flex-col`}>
      <UnAuthNavBar />
      <main className={styles.main}>
        <h1 className={`text-5xl mt-[6rem] mb-5 text-center leading-[3.5rem]`}>The best way to <br/><span className={`text-5xl text-green-400`}>design, deploy & use LLM Apps</span></h1>
        <div className="flex flex-col max-w-xl mx-auto w-full py-24">
          <div className="px-4 gap-2 flex items-center pb-2 justify-center flex w-full text-sm sm:text-base">Watch the overview of LLMHub</div>
          <div>
            <div className="border rounded" style={{position:'relative', paddingBottom:'64.86486486486486%', height:0}}>
              <iframe
                src="https://www.loom.com/embed/97f212d2115a406ab261d1d4f4ca25f3?hide_owner=true&hideEmbedTopBar=true"
                allowfullscreen=""
                style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
              >
              </iframe>
            </div>
          </div>
        </div>
        <div className="py-10 px-4 sm:px-6 xl:py-10 xl:px-8">
          <div className="sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 xl:grid-cols-3 xl:gap-x-8 flex items-center">
            {[
              "Integrate ANY LLM in 3-lines with a standardised API",
              "Deploy in 1-click",
              "Allow users to use your app in 1-click",
              "Monitor and improve your prompts",
              "Discover new prompts easily, and showcase your work",
              "Contribute to popular prompts, and improve your skills"
            ].map((statement, idx) => {
              return (
                <div className="relative" key={idx}>
                  <dt>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="absolute h-6 w-6 text-green-500"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg>
                    <p className="flex flex-row ml-9 text-lg font-medium leading-6 text-gray-900 items-center dark:text-white">
                      <span>{statement}</span>
                    </p>
                  </dt>
                </div>
              )
            })}
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
