
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BASE_API_URL, INITIAL_MODEL_CONFIGS } from "../../../../common/constants";
import { getFunctions, supabase } from "../../../../common/supabase";
import FunctionsNavbar from "../../../../components/functionsNavBar";
import PlaygroundEditor from "../../../../components/playgroundEditor";
import PlaygroundToolbar from "../../../../components/playgroundToolbar";
import ResultPane from "../../../../components/resultPane";
import AuthSideBar from "../../../../components/sidebar";
import { toast } from 'react-toastify';

// TODO: loading spinner
// TODO: navigate to deployment page on successful deployment
export default function Function({
  functions, initialFunctionData, initialExperimentData, experimentHistory, currentDeployment
}) {
  const setInitialModelConfigs = (model, config) => {
    return model ? {
      ...INITIAL_MODEL_CONFIGS,
      [model]: config
    } : INITIAL_MODEL_CONFIGS;
  }

  const router = useRouter();
  const { workspaceId, id } = router.query;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('text-davinci-003');
  const [modelConfigs, setModelConfigs] = useState(INITIAL_MODEL_CONFIGS);
  const [isPublic, setIsPublic] = useState(initialFunctionData.is_public);

  useEffect(() => {
    setPrompt(initialExperimentData.prompt || '');
    setSelectedModel(initialExperimentData.model || 'text-davinci-003');
    setModelConfigs(setInitialModelConfigs(initialExperimentData.model, initialExperimentData.config))
    setIsRefreshing(false);
  }, [initialFunctionData, initialExperimentData]);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  }

  const handleError = (friendlyMessage, error) => {
    toast(friendlyMessage, { type: 'error' });
    console.log(error)
  }

  const handleRun = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsRunning(true);
    const res = await fetch(`${BASE_API_URL}/${workspaceId}/functions/${id}/completion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        input: '',  // TODO sidroodpaska: add support for parameterisation
        model: selectedModel,
        config: modelConfigs[selectedModel]
      })
    });
    setIsRunning(false);

    if (res.status < 300) {
      console.log('success')
      refreshData();
    } else {
      handleError('Unable to run prompt', await res.json())
    }
  }

  const handleDeploy = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (currentDeployment && currentDeployment.experiment_id === initialFunctionData.current_experiment_id) {
      console.log('skipping')
      return;
    }

    setIsRunning(true);

    // create a new deployment
    let data, error;
    (
      { data, error } = await supabase
        .from('deployments')
        .insert([
          {
            experiment_id: initialFunctionData.current_experiment_id,
            function_id: id
          }
        ])
        .select()
    )
    if (error) {
      handleError('Unable to create deployment', error)
      setIsRunning(false);
      return
    }

    // update function with current_deployment_id
    let current_deployment_id = data[0].id;
    (
      { data, error } = await supabase
        .from('functions')
        .update({ current_deployment_id })
        .eq('id', id)
    );
    if (error) {
      handleError('Unable to create deployment', error)
      setIsRunning(false);
      return
    }

    setIsRunning(false);
    toast('Deployment successful', {type: 'success'});
    router.push(`/${workspaceId}/functions/${id}/deployments`);
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <AuthSideBar workspaceId={workspaceId} functions={functions} />

      <div className="h-full flex flex-col overflow-y-auto flex-1 mx-4">
        <FunctionsNavbar workspaceId={workspaceId} functionId={id} mode="playground" />
        <PlaygroundToolbar
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          modelConfigs={modelConfigs}
          setModelConfigs={setModelConfigs}
        />
        <PlaygroundEditor
          prompt={prompt}
          setPrompt={setPrompt}
          handleRun={handleRun}
          experimentHistory={experimentHistory}
          isRunning={isRunning || isRefreshing}
          handleDeploy={handleDeploy}
        />
        <ResultPane
          output={initialExperimentData.output}
          num_tokens={initialExperimentData.num_tokens}
          duration_s={initialExperimentData.duration_s}
        />
      </div>
    </div>
  );
}

// TODO sidroopdaska: error handling
export async function getServerSideProps({ params }) {
  let { workspaceId, id } = params;

  // get selected function
  let { data: functions, error } = await supabase
    .from('functions')
    .select(`*`)
    .eq('id', id);
  const selectedFunction = functions[0];

  // get current experiment
  let experiments;
  (
    { data: experiments, error } = await supabase
      .from('experiments')
      .select("*")
      .eq('id', selectedFunction.current_experiment_id)
  );
  let currentExperiment = error ? {} : experiments[0];

  //  get experiment history
  let allExperiments = [];
  (
    { data: experiments, error } = await supabase
      .from('experiments')
      .select("*")
      .eq('function_id', id)
      .order('created_at', { ascending: false })
  )
  allExperiments = allExperiments.concat(experiments);

  // get snapshot experiment history 
  if (selectedFunction && selectedFunction.fork_function_experiments_snapshot) {
    (
      { data: experiments, error } = await supabase
        .from('experiments')
        .select("*")
        .in('id', selectedFunction.fork_function_experiments_snapshot)
        .order('created_at', { ascending: false })
    )
    allExperiments = allExperiments.concat(experiments)
  }

  console.log(allExperiments);

  // get current deployment
  let deployments;
  (
    { data: deployments, error } = await supabase
      .from('deployments')
      .select("*")
      .eq('id', selectedFunction.current_deployment_id)
  )

  return {
    props: {
      functions: await getFunctions(workspaceId),
      initialFunctionData: selectedFunction,
      initialExperimentData: currentExperiment,
      experimentHistory: allExperiments,
      currentDeployment: error ? {} : deployments[0]
    }
  };
}
