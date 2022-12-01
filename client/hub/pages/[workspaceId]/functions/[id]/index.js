
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BASE_API_URL, INITIAL_MODEL_CONFIGS } from "../../../../common/constants";
import { getFunctions, supabase } from "../../../../common/supabase";
import FunctionsNavbar from "../../../../components/functionsNavBar";
import PlaygroundEditor from "../../../../components/playgroundEditor";
import PlaygroundToolbar from "../../../../components/playgroundToolbar";
import AuthSideBar from "../../../../components/sidebar";

// TODO: add function name to the top to outline that the function has changed
// TODO: loading spinner & toast
// TODO: navigate to deployment page on successful deployment
export default function Function({
  functions, initialFunctionData, initialExperimentData, experimentHistory
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
      // TODO: error handling
    }
  }

  const handleDeploy = async (event) => {
    // todo: handle multiple clicks
    setIsRunning(true);

    // create a new deployment
    let data, error;
    (
      { data, error } = await supabase
        .from('deployments')
        .insert([
          { experiment_id: initialFunctionData.current_experiment_id }
        ])
        .select()
    )
    if (error) console.log(error);

    // update function with current_deployment_id
    console.log(data);
    console.log(initialFunctionData.id);
    let current_deployment_id = data[0].id;
    (
      { data, error } = await supabase
        .from('functions')
        .update({ current_deployment_id })
        .eq('id', initialFunctionData.id)
    );
    if (error) console.log(error);

    setIsRunning(false);
    console.log('success');
  }

  const resultsPane = () => {
    return (
      <div>
        <p>output: {initialExperimentData.output}</p>
        <p>num_tokens: {initialExperimentData.num_tokens}</p>
        <p>duration_s: {initialExperimentData.duration_s}</p>
      </div>
    )
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
        {resultsPane()}
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
  (
    { data: experiments, error } = await supabase
      .from('experiments')
      .select("*")
      .eq('function_id', id)
      .order('created_at', { ascending: false })
  )

  return {
    props: {
      functions: await getFunctions(workspaceId),
      initialFunctionData: selectedFunction,
      initialExperimentData: currentExperiment,
      experimentHistory: experiments
    }
  };
}
