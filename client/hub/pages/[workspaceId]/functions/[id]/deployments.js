import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Accordion } from "flowbite-react";
import { ATTR_FRIENDLY_NAME_INDEX } from "../../../../common/constants";
import { getFunctions, supabase } from "../../../../common/supabase";
import AuthSideBar from "../../../../components/sidebar";
import FunctionsNavbar from '../../../../components/functionsNavBar';
import ViewCodeModal from "../../../../components/viewCodeModal";
import Drawer from 'rsuite/Drawer';
import Table from 'rsuite/Table';
var _ = require('lodash');
const moment = require('moment');

export default function Function({ functions, deployments, currentDeploymentId, functionCalls }) {
  const router = useRouter();
  const { workspaceId, id } = router.query;
  const [shareUrl, setShareUrl] = useState('');
  const [open, setOpen] = useState(false);
  const [cols, setCols] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (window && deployments.length > 0) setShareUrl(`${window.location.origin}/${workspaceId}/functions/${id}/share`)
  })

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

  const handleApiHistoryClick = (event, selectedDeploymentId) => {
    event.stopPropagation();

    setOpen(true)

    const filtered = functionCalls.filter(fc => fc.deployment_id === selectedDeploymentId);

    let newCols = []
    newCols.push({ key: 'output', label: 'Output' });
    // TODO sidroopdaska: change `input` type from text -> JSON string in supabase. At present, there are two types
    // coexisting in this column: text + JSON. Let's fix this asap!
    Object.keys(JSON.parse(filtered[0].input)).forEach((key, idx) => {
      newCols.push({ key: `input.${key}`, label: `Input.{{${key}}}` })
    })
    newCols.push({ key: 'created_at', label: 'Date Time' });

    setCols(newCols)
    setData(filtered)
  }

  const renderDeployments = (deployments) => {
    if (deployments.length === 0) return <span className="text-xs ml-4 dark:text-gray-300">No deployments to show</span>
    return (
      <>
        <Accordion alwaysOpen={true}>
          {
            deployments.map((deployment, idx) => {
              const numApiCalls = functionCalls.filter(fc => fc.deployment_id === deployment.id).length;
              const numApiCallsClass = numApiCalls > 0 ? "text-blue-500 hover:underline" : 'text-gray-500'
              return (
                <Accordion.Panel key={idx}>
                  <Accordion.Title>
                    {moment(deployment.created_at).format("MMMM Do YYYY, h:mm:ss")}
                    <a
                      className={`block text-xs ${numApiCallsClass}`}
                      onClick={(event) => handleApiHistoryClick(event, deployment.id)}
                      disabled={!numApiCalls}
                    >
                      {numApiCalls} API calls
                    </a>
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
              shareUrl={shareUrl}
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

  const CustomCell = ({ rowData, dataKey, ...props }) => {
    return (
      <Table.Cell {...props}>
        {
          _.get({
            ...rowData,
            input: JSON.parse(rowData.input),
            created_at: moment(rowData.created_at).format("MM-DD-YY, HH:mm:ss")
          }, dataKey)
        }
      </Table.Cell>
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
      <Drawer size={'lg'} placement={'right'} open={open} onClose={() => {
        setOpen(false)
        setCols([])
        setData([])
      }}>
        <Drawer.Header>
          <Drawer.Title>API call history</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <div>
            <Table virtualized height={400} data={data}>
              {
                cols.map((column, idx) => {
                  const { key, label } = column;
                  return (
                    <Table.Column key={key} flexGrow={1}>
                      <Table.HeaderCell>{label}</Table.HeaderCell>
                      <CustomCell dataKey={key} />
                    </Table.Column>
                  )
                })
              }
            </Table>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
}

// TODO sidroopdaska: error handling, incorrect functionId
export async function getServerSideProps({ params }) {
  const { workspaceId, id } = params;

  let error, functions;
  // fetch current deployment id
  (
    { data: functions, error } = await supabase
      .from('functions')
      .select('current_deployment_id')
      .eq('id', id)
  )

  // fetch deployments for function
  let deployments;
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

  // get function_calls / deployment
  let function_calls;
  (
    { data: function_calls, error } = await supabase
      .from('function_calls')
      .select(`
        id,
        created_at,
        deployment_id,
        input,
        output
      `)
      .in('deployment_id', deployments.map((d, idx) => d.id))
      .order('created_at', { ascending: false })
  )

  console.log('error', error);
  return {
    props: {
      functions: await getFunctions(workspaceId),
      deployments,
      currentDeploymentId: functions.length ? functions[0].current_deployment_id : null,
      functionCalls: function_calls
    }
  };
}
