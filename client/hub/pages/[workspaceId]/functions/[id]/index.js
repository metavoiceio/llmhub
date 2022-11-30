
import { useRouter } from "next/router";
import { useState } from "react";
import { BASE_API_URL, INITIAL_MODEL_CONFIGS } from "../../../../common/constants";
import { getFunctions, supabase } from "../../../../common/supabase";
import FunctionsNavbar from "../../../../components/functionsNavBar";
import PlaygroundEditor from "../../../../components/playgroundEditor";
import PlaygroundToolbar from "../../../../components/playgroundToolbar";
import AuthSideBar from "../../../../components/sidebar";

export default function Function({ functions, selectedFunction }) {
  const setInitialModelConfigs = () => {
    return INITIAL_MODEL_CONFIGS;
  }

  const router = useRouter();
  const { workspaceId, id } = router.query;
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('text-davinci-003');
  const [modelConfigs, setModelConfigs] = useState(setInitialModelConfigs());
  const [isRunning, setIsRunning] = useState(false);

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

    if (res.status < 300) {
      console.log('success')
    } else {
      // TODO: error handling
    }

    setIsRunning(false);
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
        />
        {/* {renderResultsPane()} */}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let { workspaceId, id } = params;

  // get selected function
  let { data: selectedFunction, error } = await supabase
    .from('functions')
    .select(`*`)
    .eq('id', id);

  return {
    props: {
      functions: await getFunctions(workspaceId),
      selectedFunction: selectedFunction[0]
    }
  };
}
