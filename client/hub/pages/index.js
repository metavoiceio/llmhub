import { useEffect, useState } from "react"
import UnAuthNavBar from "../components/unAuthNavBar"
import styles from '../styles/Home.module.css'
import { supabase } from '../common/supabase';
import { BsBraces } from 'react-icons/bs';
import { timeSince } from "../common/time";

export default function Home() {
  const [topFunctions, setTopFunctions] = useState([])

  useEffect(() => {
    const promise = supabase
      .from('functions')
      .select(`
        id,
        name,
        likes,
        forks,
        workspace_id,
        deployments!functions_current_deployment_id_fkey (
          id,
          created_at
        ),
        workspaces!functions_workspace_id_fkey (
          users!workspaces_user_id_fkey (
            id,
            nickname
          )
        )
      `)
      .gte('likes', 0)
      .order('likes', { ascending: false })
      .range(0, 4);

    promise
      .then(({ data: functions, error }) => {
        console.log(functions)
        setTopFunctions(functions)
      })
      .catch(console.log)
  }, [])

  const renderTopFunctions = () => {
    return topFunctions.map((func, index) => {
      return (
        <article className={`${styles.wrapper} group`} key={index}>
          <a className="block p-2" href={`${window.location.origin}/${func.workspace_id}/functions/${func.id}/share`}>
            <header className="flex items-center mb-0.5">
              <h4 className="text-md truncate text-black dark:group-hover:text-green-500 group-hover:text-green-500">
                {func.workspaces.users.nickname}/{func.name}
              </h4>
            </header>
            <div className="flex items-center text-sm text-gray-400 leading-tight whitespace-nowrap overflow-hidden mr-1">
              <BsBraces />
              <span className="px-1.5 text-gray-300">•</span>
              <span className="truncate">Updated <time dateTime={func.deployments.created_at} >{timeSince(new Date(func.deployments.created_at))} ago</time></span>
              <span className="px-1.5 text-gray-300">•</span>
              <svg
                className="flex-none w-3 text-gray-400 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" fill="currentColor">
                <path d="M22.45,6a5.47,5.47,0,0,1,3.91,1.64,5.7,5.7,0,0,1,0,8L16,26.13,5.64,15.64a5.7,5.7,0,0,1,0-8,5.48,5.48,0,0,1,7.82,0L16,10.24l2.53-2.58A5.44,5.44,0,0,1,22.45,6m0-2a7.47,7.47,0,0,0-5.34,2.24L16,7.36,14.89,6.24a7.49,7.49,0,0,0-10.68,0,7.72,7.72,0,0,0,0,10.82L16,29,27.79,17.06a7.72,7.72,0,0,0,0-10.82A7.49,7.49,0,0,0,22.45,4Z"></path>
              </svg>
              {func.likes}
              <span className="px-1.5 text-gray-300">•</span>

              <svg aria-hidden="true" height="1em" viewBox="0 0 16 16" version="1.1" width="1em" data-view-component="true" className="octicon octicon-repo-forked flex-none w-3 text-gray-400 mr-0.5" fill="currentColor">
                <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
              </svg>
              {func.forks}
            </div>
          </a>
        </article>
      )
    })
  }

  return (
    <div className={`${styles.container} dark:bg-gray-900 flex flex-col`}>
      <UnAuthNavBar />
      <main className={styles.main}>
        <h1 className={`text-5xl mt-[8rem] mb-5 text-center leading-[3.5rem]`}>The best way to <br /><span className={`text-5xl text-green-400`}>design, deploy & use LLM Apps</span></h1>
        <div className="w-[50vw] grid grid-cols-1 gap-3 mt-12">
          <div className="sm:flex-auto text-center">
            <h1 className="text-base font-medium text-gray-900 dark:text-white">🔥 Top Community Apps</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Discover apps created by the community. They serve as great examples to get started with LLMHub.</p>
          </div>
          {renderTopFunctions()}
        </div>
        {/* video */}
        <div className="flex flex-col max-w-xl mx-auto w-full py-24">
          <h1 className="text-center font-medium text-gray-900 mb-4 dark:text-white">👀 Watch the overview of LLMHub</h1>
          <div>
            <div className="border rounded" style={{ position: 'relative', paddingBottom: '64.86486486486486%', height: 0 }}>
              <iframe
                src="https://www.loom.com/embed/97f212d2115a406ab261d1d4f4ca25f3?hide_owner=true&hideEmbedTopBar=true"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              >
              </iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
