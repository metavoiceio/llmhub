import { Accordion } from "flowbite-react";
import { useRouter } from "next/router";
import { ATTR_FRIENDLY_NAME_INDEX } from "../../../../common/constants";
import { getFunctions, supabase } from "../../../../common/supabase";
import AuthSideBar from "../../../../components/sidebar";
import FunctionsNavbar from '../../../../components/functionsNavBar';
import ViewCodeModal from "../../../../components/viewCodeModal";

const moment = require('moment');

export default function Function({ functions, deployments, currentDeploymentId }) {
  const router = useRouter();
  const { workspaceId, id } = router.query;

  const renderDeploymentContent = (prompt, model, config) => {
    // TODO: migrate textarea duplicate code into an independent function
    const numNewLines = prompt && prompt.split(/\r\n|\r|\n/).length;
    return (
      <div className="-ml-2 flex">
        <textarea
          readOnly
          rows={numNewLines >= 10 ? 10 : numNewLines}
          className="flex-1 text-sm font-normal text-gray-900 dark:text-gray-300 border-none border-transparent focus:border-transparent focus:ring-0 dark:bg-gray-700 rounded"
          value={prompt}
        />
        <div className="w-[20rem] max-md:w-[12rem] border-l flex flex-col pl-8 pr-8">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-800 dark:text-gray-400">Model</div>
            <div className="text-sm">{model}</div>
          </div>
          {
            Object.entries(config).map(([key, value], idx) => {
              return (
                <div className="flex items-center justify-between" key={idx}>
                  <div className="text-xs text-gray-800 dark:text-gray-400">{ATTR_FRIENDLY_NAME_INDEX[key]}</div>
                  <div className="text-sm">{value}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  const renderDeployments = (deployments) => {
    if (deployments.length === 0) return <span className="text-xs ml-4 dark:text-gray-300">No deployments to show</span>
    return (
      <>
        <Accordion flush alwaysOpen={true}>
          {
            deployments.map((deployment, idx) => {
              return (
                <Accordion.Panel key={idx}>
                  <Accordion.Title>
                    {moment(deployment.created_at).format("MMMM Do YYYY, h:mm:ss")}
                  </Accordion.Title>
                  <Accordion.Content>
                    {
                      renderDeploymentContent(
                        deployment.experiments.prompt,
                        deployment.experiments.model,
                        deployment.experiments.config
                      )
                    }
                  </Accordion.Content>
                </Accordion.Panel>
              )
            })
          }
        </Accordion>
      </>
    )
  }

  const render = () => {
    const currentDeployments = deployments.filter(d => d.id === currentDeploymentId);
    const pastDeployments = deployments.filter(d => d.id !== currentDeploymentId);
    return (
      <div className="p-4 mt-4 overflow-y-auto flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <span className="bg-green-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-1 rounded dark:bg-green-200 dark:text-green-900">
              ACTIVE
            </span>
          </div>
          {
            currentDeployments.length > 0 &&
            <ViewCodeModal
              shareUrl={`${window.location.origin}/${workspaceId}/functions/${id}/share`}
              inputKeys={Object.keys(currentDeployments[0].experiments.input)}
            />
          }
        </div>
        {renderDeployments(currentDeployments)}
        <div>
          <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-1 rounded dark:bg-pink-200 dark:text-pink-900">
            PAST
          </span>
        </div>
        {renderDeployments(pastDeployments)}
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen dark:bg-gray-900">
      <AuthSideBar workspaceId={workspaceId} functions={functions} functionId={id} />
      <div className="h-full flex flex-col overflow-y-auto flex-1 mx-4">
        <FunctionsNavbar
          workspaceId={workspaceId}
          functionId={id}
          mode="deployments"
          allowShare={!!currentDeploymentId}
        />
        {
          deployments.length > 0 ?
            render() :
            <div className="flex h-[80vh]">
              <div className="m-auto flex flex-col items-center">
                <div className="text-lg">
                  No deployments have been made.
                </div>
                <div className="text-md">
                  Please deploy a Prompt from the Playground page
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  );
}

// TODO sidroopdaska: error handling, incorrect functionId
export async function getServerSideProps({ params }) {
  const { workspaceId, id } = params;

  let data, error, functions;
  // fetch current deployment id
  (
    { data: functions, error } = await supabase
      .from('functions')
      .select('current_deployment_id')
      .eq('id', id)
  )

  let deployments;
  // fetch deployments for function
  (
    { data: deployments, error } = await supabase
      .from('deployments')
      .select(`
        id,
        created_at,
        experiments (
          id,
          prompt,
          input,
          model,
          config
        )
      `)
      .eq('function_id', id)
      .order('created_at', { ascending: false })
  )

  console.log(error);
  console.log('input', deployments[0].experiments.input);
  return {
    props: {
      functions: await getFunctions(workspaceId),
      deployments,
      currentDeploymentId: functions.length ? functions[0].current_deployment_id : null
    }
  };
}
