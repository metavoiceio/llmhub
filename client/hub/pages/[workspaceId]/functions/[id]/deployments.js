import { Accordion } from "flowbite-react";
import { useRouter } from "next/router";
import { ATTR_FRIENDLY_NAME_INDEX } from "../../../../common/constants";
import { getFunctions, supabase } from "../../../../common/supabase";
import AuthSideBar from "../../../../components/sidebar";
const moment = require('moment');

export default function Function({ functions, deployments, currentDeploymentId }) {
  const router = useRouter();
  const { workspaceId, id } = router.query;

  const renderPastDeployments = () => {
    return (
      <>
        <div>
          <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-1 rounded dark:bg-pink-200 dark:text-pink-900">PAST</span>
        </div>
        <Accordion alwaysOpen={false}>
          <Accordion.Panel>
            <Accordion.Title>
              What is Flowbite?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Check out this guide to learn how to{' '}
                <a
                  href="https://flowbite.com/docs/getting-started/introduction/"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  get started
                </a>
                {' '}and start developing websites even faster with components on top of Tailwind CSS.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </>
    )
  }

  const renderDeployments = () => {
    const currentDeployment = deployments.filter(d => d.id === currentDeploymentId)[0];
    const experiment = currentDeployment.experiments;
    return (
      <div className="p-4 mt-16 overflow-y-auto flex flex-col gap-5">
        <div>
          <span className="bg-green-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-1 rounded dark:bg-green-200 dark:text-green-900">
            ACTIVE
          </span>
        </div>
        <Accordion alwaysOpen={true} flush>
          <Accordion.Panel>
            <Accordion.Title className="text-sm">
              {moment(currentDeployment.created_at).format("MMMM Do YYYY, h:mm:ss")}
            </Accordion.Title>
            <Accordion.Content>
              <div className="-ml-2 flex">
                <textarea readOnly className="flex-1 text-sm font-normal text-gray-900 dark:text-gray-400 border-none border-transparent focus:border-transparent focus:ring-0">{experiment.prompt}</textarea>
                <div className="w-[20rem] max-md:w-[12rem] border-l flex flex-col pl-8 pr-8">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-800">Model</div>
                    <div className="text-sm">{experiment.model}</div>
                  </div>
                  {
                    Object.entries(experiment.config).map(([key, value], idx) => {
                      return (
                        <div className="flex items-center justify-between" key={idx}>
                          <div className="text-xs text-gray-800">{ATTR_FRIENDLY_NAME_INDEX[key]}</div>
                          <div className="text-sm">{value}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
        {renderPastDeployments()}
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AuthSideBar workspaceId={workspaceId} functions={functions} />
      {/* TODO: render header */}
      <div className="h-full flex flex-col overflow-y-auto flex-1">
        {
          deployments.length === 0 ? <p>No deployments have been made.</p> : renderDeployments()
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
          model,
          config
        )
      `)
      .eq('function_id', id)
      .order('created_at', { ascending: false })
  )

  console.log(error);
  return {
    props: {
      functions: await getFunctions(workspaceId),
      deployments,
      currentDeploymentId: functions[0].current_deployment_id
    }
  };
}
