import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react"
import { unstable_getServerSession } from "next-auth/next"
import Image from "next/image";
import Link from "next/link";
import { Badge, Button, Navbar } from "flowbite-react"
import PlaygroundEditor from "../../../../components/playgroundEditor";
import ResultPane from "../../../../components/resultPane";
import logo from "../../../../public/android-chrome-233x233.png";
import { supabase } from '../../../../common/supabase';
import { ATTR_FRIENDLY_NAME_INDEX } from "../../../../common/constants";
import { useRouter } from "next/router";
import { authOptions } from '../../../../pages/api/auth/[...nextauth]'
import PromptVariables from "../../../../components/promptVariables";
import { toast } from 'react-toastify';

export default function Share({
  initialPrompt, model, config, initialInput, initialOutput,
  initial_num_tokens, initial_duration_s, userWorkspaceId,
  initialLikes, initialUserHasLiked, initialForks

}) {
  const router = useRouter();
  const { workspaceId, id } = router.query;
  const { data: session, status } = useSession();
  const [isRunning, setIsRunning] = useState(false);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [promptVariables, setPromptVariables] = useState(initialInput);
  const [result, setResult] = useState({
    output: initialOutput,
    num_tokens: initial_num_tokens,
    duration_s: initial_duration_s
  });
  const [likes, setLikes] = useState(initialLikes)
  const [userHasLiked, setUserHasLiked] = useState(initialUserHasLiked)

  const handleLike = async (event) => {
    if (!session) signIn('auth0', { callbackUrl: window.location.href })

    const newUserHasLiked = !userHasLiked
    const oldLikes = likes

    fetch(`/api/internal/${workspaceId}/functions/${id}/like?mode=${newUserHasLiked}`, { method: 'GET' })
      .catch(error => {
        setUserHasLiked(false)
        setLikes(oldLikes)
        console.log(error)
        toast("Unable to like function", { type: 'error' });
      })

    setUserHasLiked(newUserHasLiked)
    setLikes(likes + (newUserHasLiked ? 1 : -1))
  }

  const handleRun = async (event) => {
    try {
      event.stopPropagation();
      event.preventDefault();

      setIsRunning(true);

      const res = await fetch(`/api/v0/${workspaceId}/functions/${id}`, {
        method: 'POST',
        body: JSON.stringify({
          input: promptVariables,
          mode: 'share-ui'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.id_token}`
        }
      })

      if (res.status > 300) console.log(await res.json());

      const newResult = await res.json();
      setResult({
        output: newResult.output,
        num_tokens: newResult.num_tokens,
        duration_s: newResult.duration_s,
      })

    } catch (error) {
      console.log(error)
    }
    setIsRunning(false);
  }

  const likeButton = () => {
    return (
      <Button
        color="light"
        size={'xs'}
        onClick={handleLike}
      >
        {userHasLiked ?
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#ef4444" className="mr-2 -ml-1 bi bi-heart-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          </svg> :
          <svg className="mr-2 -ml-1 bi bi-heart" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        }
        Like
        <span className="inline-flex justify-center items-center ml-2 w-5 h-5 rounded-lg text-sm font-semibold text-blue-800 bg-blue-200">
          {likes}
        </span>
      </Button>
    )
  }

  const forkButton = () => {
    return (
      <Button
        color="light"
        size={'xs'}
        onClick={event => {
          if (!session) signIn('auth0', { callbackUrl: window.location.href })
          router.push(`/${userWorkspaceId}?fork=${encodeURIComponent(window.location.pathname)}`)
        }}
      >
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-repo-forked mr-2" fill="currentColor">
          <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
        </svg>
        Fork
        <span className="inline-flex justify-center items-center ml-2 w-5 h-5 rounded-lg text-sm font-semibold text-blue-800 bg-blue-200">
          {initialForks}
        </span>
      </Button>
    )
  }

  const navbar = () => {
    const unauthView = () => {
      return (
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1">
            {likeButton()}
            {forkButton()}
            <button
              className="ml-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              onClick={e => signIn('auth0', { callbackUrl: window.location.href })}
            >
              Login to Run/Fork
            </button>
          </div>
          <div className="w-fit">
            <Badge
              color="pink"
              size="sm"
            >
              Mode: View
            </Badge>
          </div>
        </div>
      )
    }

    const authView = () => {
      return (
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            {likeButton()}
            {forkButton()}
          </div>
          <div>
            <Badge
              color="pink"
              size="sm"
            >
              Mode: View & Run
            </Badge>
          </div>
        </div>
      )
    }

    return (
      <Navbar
        fluid={true}
        rounded={true}
        className='pt-4 dark:bg-gray-900'
      >
        <Link href={`/`}>
          <Image src={logo} alt="LLMHub logo" className="inline mr-1" width={48} />
        </Link>
        {session ? authView() : unauthView()}
      </Navbar>
    )
  }

  const configPanel = () => {
    return (
      <div className="px-4 min-w-[18rem]">
        <h2 className="text-xs text-gray-800 mb-4 dark:text-gray-300">CONFIG</h2>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-800 dark:text-gray-300">Model</div>
            <div>{model}</div>
          </div>
          {Object.entries(config).map(([key, value], index) => {
            return (
              <div className="flex items-center justify-between" key={`config-${index}`}>
                <div className="text-xs text-gray-800 dark:text-gray-300">{ATTR_FRIENDLY_NAME_INDEX[key]}</div>
                <div>{value}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="dark:bg-gray-900 h-screen">
      {navbar()}
      <div className="max-h-screen px-5 mt-8 flex overflow-y-hidden scrollbar-hide grid grid-cols-12">
        <div className='col-span-8'>
          <div className="flex flex-col">
            <PlaygroundEditor
              prompt={prompt}
              setPrompt={setPrompt}
              handleRun={session ? handleRun : null}
              handleDeploy={null}
              experimentHistory={null}
              isRunning={isRunning}
              currentDeployment={null}
              promptVariables={null}
              setPromptVariables={null}
              isSharing={true}
            />
            <ResultPane
              output={result.output}
              num_tokens={result.num_tokens}
              duration_s={result.duration_s}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 col-span-4">
          <PromptVariables promptVariables={promptVariables} setPromptVariables={setPromptVariables} />
          {configPanel()}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { workspaceId, id } = context.params
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  let promises = []
  // get workspace owned by user
  if (session) {
    promises.push(
      supabase
        .from('workspaces')
        .select('*')
        .eq('user_id', session.user.id)
    )

    promises.push(
      supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
    )
  }

  promises.push(
    supabase
      .from('functions')
      .select(`
        deployments!functions_current_deployment_id_fkey (
          experiments (
            id,
            prompt,
            input,
            model,
            config,
            output,
            num_tokens,
            duration_s
          )
        )
      `)
      .eq('id', id)
  )

  promises.push(
    supabase
      .from('functions')
      .select('*')
      .eq('id', id)
  )

  const results = await Promise.all(promises)

  const data = (result) => {
    if (result.error) throw Error(result.error)
    return result.data[0]
  }

  let experiment, likes, forks, userWorkspaceId = null, userLikes = null
  if (session) {
    userWorkspaceId = data(results[0]).id;
    userLikes = data(results[1]).likes;

    experiment = data(results[2]).deployments.experiments;
    likes = data(results[3]).likes;
    forks = data(results[3]).forks;
  } else {
    experiment = data(results[0]).deployments.experiments;
    likes = data(results[1]).likes;
    forks = data(results[1]).forks;
  }

  return {
    props: {
      initialPrompt: experiment.prompt,
      model: experiment.model,
      config: experiment.config,
      initialInput: experiment.input,
      initialOutput: experiment.output,
      initial_num_tokens: String(experiment.num_tokens),
      initial_duration_s: String(experiment.duration_s),
      userWorkspaceId: userWorkspaceId,
      initialLikes: likes,
      initialForks: forks,
      initialUserHasLiked: userLikes && userLikes.filter(fid => fid === parseInt(id)).length > 0
    }
  };
}
