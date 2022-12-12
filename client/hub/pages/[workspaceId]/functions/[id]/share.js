import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react"
import { unstable_getServerSession } from "next-auth/next"
import Image from "next/image";
import Link from "next/link";
import { Badge, Navbar } from "flowbite-react"
import PlaygroundEditor from "../../../../components/playgroundEditor";
import ResultPane from "../../../../components/resultPane";
import logo from "../../../../public/android-chrome-233x233.png";
import { supabase } from '../../../../common/supabase';
import { ATTR_FRIENDLY_NAME_INDEX } from "../../../../common/constants";
import { useRouter } from "next/router";
import { AiOutlineFork } from "react-icons/ai";
import { authOptions } from '../../../../pages/api/auth/[...nextauth]'
import PromptVariables from "../../../../components/promptVariables";

export default function Share({
  initialPrompt, model, config, initialInput, initialOutput,
  initial_num_tokens, initial_duration_s, userWorkspaceId
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

  const navbar = () => {
    const unauthView = () => {
      return (
        <div className="flex items-center md:order-2">
          <Badge
            color="pink"
            size="sm"
          >
            Mode: View
          </Badge>
          <button
            className="ml-2 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            onClick={e => signIn('auth0', { callbackUrl: window.location.href })}
          >
            Login to Run/Fork
          </button>
        </div>
      )
    }

    const authView = () => {
      return (
        <div className="flex md:order-2">
          <button
            className="mr-2 hover:bg-gray-200 px-2 rounded"
            onClick={e => router.push(`/${userWorkspaceId}?fork=${encodeURIComponent(window.location.pathname)}`)}
          >
            <AiOutlineFork />
          </button>
          <Badge
            color="pink"
            size="sm"
          >
            Mode: View & Run
          </Badge>
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
      <div className="max-h-screen px-5 mt-10 flex overflow-y-hidden scrollbar-hide">
        <div className='flex-1'>
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
        <div className="flex flex-col gap-4">
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

  let error, workspaces = [];

  // get workspace owned by user
  if (session) {
    (
      { data: workspaces, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('user_id', session.user.id)
    )
  }

  let functions;
  (
    { data: functions, error } = await supabase
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

  const experiment = functions && functions[0].deployments.experiments;
  return {
    props: {
      initialPrompt: experiment.prompt || '',
      model: experiment.model || '',
      config: experiment.config || {},
      initialInput: experiment.input,
      initialOutput: experiment.output || '',
      initial_num_tokens: experiment.num_tokens || '0',
      initial_duration_s: experiment.duration_s || '0.0',
      userWorkspaceId: workspaces.length > 0 ? workspaces[0].id : null
    }
  };
}
