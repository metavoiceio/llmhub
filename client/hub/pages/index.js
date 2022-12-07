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
    <div className={styles.container}>
      <UnAuthNavBar />
      <main className={styles.main}>
        {/* <h3 className={`${styles.hubIntro} mt-2 mb-2`}>Large Language Model-based applications are hard to build and hard to use.</h3> */}
        <h1 className={`text-5xl mt-[6rem] mb-5`}>The best way to <span className="text-green-400">discover,</span></h1>
        <h1 className={`text-5xl text-green-400`}>design, deploy and use LLM Apps</h1>
        <div className='flex gap-5 mt-[6rem]'>
          <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400 text-center">Author</h5>
            <ul role="list" className="space-y-5 my-7">
              {
                [
                  "1-time 1-click setup",
                  "Best way to use open-source projects that use LLMs."
                ].map((point, idx) => {
                  return (
                    <li className="flex space-x-3" key={idx}>
                      <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{point}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>

          <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400 text-center">Open-source Contributor</h5>
            <ul role="list" className="space-y-5 my-7">
              {
                [
                  "1-time 1-click setup",
                  "Best way to use open-source projects that use LLMs."
                ].map((point, idx) => {
                  return (
                    <li className="flex space-x-3" key={idx}>
                      <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{point}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400 text-center">End User</h5>
            <ul role="list" className="space-y-5 my-7">
              {
                [
                  "1-time 1-click setup",
                  "Best way to use open-source projects that use LLMs."
                ].map((point, idx) => {
                  return (
                    <li className="flex space-x-3" key={idx}>
                      <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{point}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


// - Integrate ANY LLM in 3-lines with a standardised API.
// - Deploy in 1-click.
// - Allow users to use your app in 1-click.

// - Monitor your prompt in production.
// - Discover new prompts easily, and showcase your work.
// - Contribute to popular prompts, and improve your skills.